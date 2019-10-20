
import React, { useState } from 'react'
import { Card, CardDeck, Image } from 'react-bootstrap'
import Styles from './weather-widget.module.css'
import WeatherApi from './weather-api'

/*
    props: {
        widgetName: 'name,
        cityName: 'name'
    }
*/
const WeatherWidget = props => {

    const [forecast, setForecast] = useState(null)

    const updateForecast = async () => {
        const forecast = await WeatherApi.getForecast()
        setForecast(forecast)
    }

    setInterval(updateForecast, 30000)
    updateForecast()

    return (
        <CardDeck lg={3}>
            <Card className={Styles.WeatherCard} lg={1}>
                <Image src='/icons/sun.svg' />
            </Card>

            <Card lg={2}>
                <Card.Title>{props.widgetName}</Card.Title>
                <Card.Subtitle>{props.cityName}</Card.Subtitle>
                <Image src='/icons/sun.svg' />
            </Card>
        </CardDeck>
    )
}

export default WeatherWidget