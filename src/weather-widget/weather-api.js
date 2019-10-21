
import WeatherWidgetConstants from './weather-widget-constants'
import Logs from '../logs-api'

if (!fetch)
    var fetch = require('node-fetch')

class WeatherApi {

    static async getForecast(nDays) {
        let forecast = await this._requre3HoursForecast()
        while (!forecast || !forecast.list) {
            Logs.warn('WeatherApi:getForecast()', 'data fetching failed', forecast)
            return null
        }
        return this._paresForecast(forecast, nDays)
    }

    // Проноз на 5 дней на каждые 3 часа
    static async _requre3HoursForecast(cityName = 'Rostov-na-Donu') {
        try {
            let query = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName},RU&APPID=${WeatherWidgetConstants.OPEN_WEATHER_API_KEY}`
            let res = await fetch(query)
            let data = await res.json()
            return data
        }
        catch (e) {
            Logs.err('WeatherApi:_requre3HoursForecast', 'data fetching fail', null, e)
        }
    }


    // Получить среднюю теспературу и тип погоды на ближайшие 3 дня 
    // формат: [nextDay, day2, day3] day: { temp: celcius, weatherIcon: iconCode (see https://openweathermap.org/weather-conditions) }
    static _paresForecast(forecast, nDays) {
        let currentDate = new Date().getDate()
        let res = []
        for (let i = 0; i < nDays; ++i)
            res.push({ temp: 0, count: 0 })

        for (let w of forecast.list) {
            let date = new Date(w.dt_txt).getDate(),
                icon = w.weather[0].icon

            let day = date - currentDate
            if (!day)
                continue // сегодняшний день пропускается

            --day
            if (!res[day])
                continue

            res[day].temp += this._kelvinToCelcius(w.main.temp)
            ++res[day].count
            res[day][icon] ? ++res[day][icon] : res[day][icon] = 1
        }

        // определение средней температуры и преобладающей погоды за день 
        for (let i = 0; i < nDays; ++i) {
            let day = res[i]
            day.temp = Math.round(
                day.temp / day.count
            )

            let maxIconValue = 0, icon // иконка погоды, которая чаще всего встречалась за день 
            for (let k in day) {
                if (k !== 'temp' && k !== 'count' && day[k] > maxIconValue) {
                    maxIconValue = day[k]
                    icon = k
                }
            }
            day.weatherIcon = icon
        }

        return res
    }

    static _UtcToLocal(time_string) {
        return new Date(time_string + " UTC")
    }

    static _kelvinToCelcius(temp) {
        return temp - 273.15
    }
}

export default WeatherApi