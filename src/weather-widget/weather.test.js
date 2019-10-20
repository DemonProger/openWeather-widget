
import "babel-polyfill"
import WeatherApi from './weather-api'

jest.setTimeout(60000)
test('forecast fetching', async () => {
    let timeStart = new Date().getMilliseconds(), fetchingTime
    let forecast = await WeatherApi._requre3HoursForecast()
    fetchingTime = new Date().getMilliseconds() - timeStart
    console.log(`Forecast fetching time = ${fetchingTime} ms`)

    console.log('Forecast:')
    let table = 'TEMP                   UTC               LOCAL_TIME     ICON \n'
    for (let d of forecast.list)
        table += `${WeatherApi._kelvinToCelcius(d.main.temp)}  ${d.dt_txt}  ${WeatherApi._UtcToLocal(d.dt_txt)}  ${d.weather[0].icon} \n`
    console.log(table, '\n\n')
})

test('forecast data parsing', async () => {
    let parsed = await WeatherApi.getForecast()
    console.log("parsed:", parsed)
})