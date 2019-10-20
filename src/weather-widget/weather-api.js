
import WeatherWidgetConstants from './weather-widget-constants'
import Logs from '../logs-api'
import Axios from 'axios'

class WeatherApi {

    static async getForecast() {
        let forecast = await this._requre3HoursForecast()
        // while (!forecast)
        //     forecast = await this._requre3HoursForecast()

        return this._paresForecast(forecast)
    }

    // Проноз на 5 дней на каждые 3 часа
    static async _requre3HoursForecast(cityName = 'Rostov-na-Donu') {
        try {
            let query = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName},RU&APPID=${WeatherWidgetConstants.OPEN_WEATHER_API_KEY}`
            const queryConfig = Axios.create({
                baseURL: query,
                timeout: 80000
            })

            let res = await queryConfig.request(query)
            let data = await res.json()
            return data
        }
        catch (e) {
            Logs.err('WeatherApi:_requre3HoursForecast', 'data fetching fail', null, e)
        }
    }


    // Получить среднюю теспературу и тип погоды на ближайшие 3 дня 
    // формат: [nextDay, day2, day3] day: { temp: celcius, weatherType: iconCode (see https://openweathermap.org/weather-conditions) }
    static _paresForecast(forecast) {
        let currentDate = new Date().getDate(),
            res = [1, 2, 3].map(() => ({ temp: 0, count: 0 }))

        for (let w of forecast.list) {
            let date = new Date(w.dt_txt).getDate(),
                icon = w.weather[0].icon
            switch (date - currentDate) {
                // следующий день
                case 1:
                    res[0].temp += w.main.temp
                    ++res[0].count // количество измерений температуры для вычисления средней 
                    res[0][icon] ? ++res[0][icon] : res[0][icon] = 1 // подсчет кол-ва иконок погоды каждого типа
                    break

                // следующий день
                case 2:
                    res[1].temp += w.main.temp
                    ++res[1].count
                    res[1][icon] ? ++res[1][icon] : res[1][icon] = 1
                    break

                // следующий день
                case 3:
                    res[2].temp += w.main.temp
                    ++res[2].count
                    res[2][icon] ? ++res[2][icon] : res[2][icon] = 1
                    break

                default: // сегодняшний день и остальные не обрабатываются
            }
        }

        // определение средней температуры и преобладающей погоды за день 
        for (let i = 0; i < 3; ++i) {
            let day = res[i]
            day.temp = this._kelvinToCelcius(day.temp / day.count)
            delete day.count // лишнее поле в объекте

            let maxIconValue = 0, icon // иконка погоды, которая чаще всего встречалась за день 
            for (let k in day) {
                if (k !== 'temp' && day[k] > maxIcon) {
                    maxIconValue = day[k]
                    icon = k
                }

                delete day[k] // иконки больше не нужны в объекте 
            }
            day.weatherType = icon
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