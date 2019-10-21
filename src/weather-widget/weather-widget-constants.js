
export default {
    // ключ доступа к IP. Trial version запросов в минуту < 60
    // OPEN_WEATHER_API_KEY: '29fe5283574055b2026d7a158ef4c393',
    OPEN_WEATHER_API_KEY: '494bc6c6acc6da38f3ffc127c23e5ef0',

    // запрос прогноза на 4 дня с шагом в 3 часа для Ростова 
    QUERY_API: 'http://api.openweathermap.org/data/2.5/forecast?q=Rostov-na-Donu,RU&APPID=29fe5283574055b2026d7a158ef4c393',

    // иконки погоды 
    WEATHER_ICONS: {
        // дневные иконки 
        clearSky: '01d',
        fewCloouds: '02d',
        scatteredClouds: '03d',
        brokenClouds: '04d',
        showerRain: '09d',
        rain: '10d',
        thunderstorm: '11d',
        snow: '13d',
        mist: '50d',

        // 
    }
}