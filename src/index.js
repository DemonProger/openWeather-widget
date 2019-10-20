
import React from "react"
import ReactDOM from "react-dom"
import { Container } from 'react-bootstrap'
import WeatherWidget from './weather-widget/weather-widget.jsx'

ReactDOM.render(
    <Container>
        <WeatherWidget widgetName='Погода на ближайшие 3 дня' cityName='Ростов-на-Дону' />
    </Container>
    , document.getElementById('app')
)