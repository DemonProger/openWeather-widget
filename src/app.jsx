
import React from 'react'
import { Container, Alert } from 'react-bootstrap'
import WeatherWidget from './weather-widget/weather-widget.jsx'
import Styles from './app.module.css'

const App = props => {
    return (
        <Container className={Styles.WideContainer}>
            <WeatherWidget widgetName='Погода на ближайшие 3 дня' cityName='Ростов-на-Дону' />
        </Container>
    )
}

export default App