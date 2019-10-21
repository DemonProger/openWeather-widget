
import React, { useState, useEffect } from 'react'
import { Card, CardDeck, Image, Alert, Container } from 'react-bootstrap'
import Styles from './weather-widget.module.css'
import WeatherApi from './weather-api'
import Logs from '../logs-api'

/*
    props: {
        widgetName: 'name,
        cityName: 'name'
    }
*/
const WeatherWidget = props => {
    const [forecast, setForecast] = useState(null)

    useEffect(() => {
        let isUnmounted = false

        if (!forecast)
            WeatherApi.getForecast(3).then(forecast => {
                if (!isUnmounted && forecast)
                    setForecast(forecast)
            })

        return () => { isUnmounted = true }
    })

    return (
        <Container>
            <h3>{props.widgetName}</h3>
            <p>{props.cityName}</p>
            <CardDeck className={Styles.WeatherWidget}>
                {
                    forecast
                    &&
                    forecast.map((day, index) => {
                        let days = getNextWeekDays(3)
                        return (
                            <Card key={index} className={Styles.WeatherCard}>
                                <Card.Body>
                                    <Card.Title className={Styles.WeatherTitle}>{days[index]}</Card.Title>
                                    <Image className={Styles.WeatherIcon} src={getIconSrc(day.weatherIcon)} />
                                    <Card.Text className={Styles.WeatherText}>Средняя температура: {day.temp} &deg;C</Card.Text>
                                </Card.Body>
                            </Card>
                        )
                    })
                }

                {
                    !forecast
                    &&
                    <Alert type='info'>Загрузка данных...</Alert>
                }
            </CardDeck>
        </Container>
    )
}

// для имени иконки получить src файла (см. https://openweathermap.org/weather-conditions)
function getIconSrc(weatherIconName) {
    let iconCode = weatherIconName.substring(0, weatherIconName.length - 1),
        iconsPath = '/icons/'
    switch (iconCode) {
        case '01': return iconsPath + 'sun.svg'
        case '02': return iconsPath + 'cloudy.svg'
        case '03': return iconsPath + 'cloud.svg'
        case '04': return iconsPath + 'black-cloud.svg'
        case '09': return iconsPath + 'drop.svg'
        case '10': return iconsPath + 'drop.svg'
        case '11': return iconsPath + 'storm.svg'
        case '13': return iconsPath + 'snowflake.svg'
        case '50': return iconsPath + 'fogg.svg'

            defaut:
            Logs.err('GetIconSrc', 'icon was not found ', { iconName: weatherIconName })
    }
}

// получить следующие nDays дней недели ['понедельник', 'вторник'...]
function getNextWeekDays(nDays) {
    let now = new Date(),
        temp = new Date(),
        res = []

    for (let i = 1; i <= nDays; ++i) {
        temp.setDate(now.getDate() + i)
        res.push(
            temp.toLocaleString('ru', { month: 'long', day: 'numeric' })
        )
    }
    return res
}

export default WeatherWidget