import { useState } from "react"

export const AppClima = () => {

    const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
    const API_KEY = '562f135e97add3e9a3ac9b88f53bd7d6'
    const kelvin = 273.15
    const inp = document.getElementById('inp')
    const [ciudad, setCiudad] = useState('')
    const [dataClima, setDataClima] = useState(null)

    const handleCiudad = (e) => {
        setCiudad(e.target.value)

    }

    const clear = () => {
        inp.value = ''
        setDataClima(null)
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        if (ciudad.length > 0) fetchClima()
        clear()
    }

    const fetchClima = async () => {
        try {
            const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`)
            if (!response.ok) {
                throw new error('Algo salio mal')
            }
            const data = await response.json()
            setDataClima(data)

        } catch (error) {
            alert('No pudimos encontrar esa Ciudad')

        }
    }



    return (
        <div className="container">
            <h1>App Clima</h1>

            <form onSubmit={handleSubmit}>
                <input id="inp" type="text" onChange={handleCiudad} autoComplete="off" />
                <button type="submit">Buscar</button>
                <button type="button" onClick={clear}>Reset</button>
            </form>

            {
                dataClima && (
                    <div>
                        <h2>Ciudad: {dataClima.name} {dataClima.sys.country}</h2>
                        <p>Temperatura: {parseInt(dataClima?.main?.temp - kelvin)}°C</p>
                        <p>Sensacion Real: {parseInt(dataClima?.main?.feels_like - kelvin)}</p>
                        <p>Temperatura Maxima: {parseInt(dataClima?.main?.temp_max - kelvin)}</p>
                        <p>Temperatura Minima: {parseInt(dataClima?.main?.temp_min - kelvin)}</p>
                        <img src={`https://openweathermap.org/img/wn/${dataClima?.weather?.[0].icon}@2x.png`} alt="" />

                    </div>


                )
            }

        </div>
    )
}
