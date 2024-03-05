import WeatherInfo from '../WeatherInfo/WeatherInfo'
import './Home.scss'
import { useEffect, useState } from 'react'
import Clock from '../Clock/Clock'
import TodoContainer from '../../container/TodoContainer/TodoContainer'
import { GeoLocation } from '../../types/GeoLocation'
import CustomMap from '../CustomMap/CustomMap'



const Home = () => {
    const [greeting, setGreeting] = useState<string>('')
    const [location, setLocation] = useState<GeoLocation>()
    const user = 'Kumani'


    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
            setLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            })
        })
        } else {
            console.log('Geolocation is not supported by this browser.')
        }
    }, [])

    useEffect(() => {
        const date = new Date()
        const hours = date.getHours()
        if (hours < 12) {
            setGreeting('Good Morning')
        } else if (hours < 18) {
            setGreeting('Good Afternoon')
        } else {
            setGreeting('Good Evening')
        }
    }, [])

    return (
        <div className="home">
            <h1 className='home__greeting'>{greeting}, {user}!</h1>
            <div className="home__top-row">
                <Clock />
                <WeatherInfo location={location}/>
                <CustomMap location={location}/>
            </div>
            <div className="home__bottom-row">
                <TodoContainer />
            </div>

            
            
        </div>
    )
}

export default Home