import WeatherInfo from '../WeatherInfo/WeatherInfo'
import './Home.scss'
import { useEffect, useState } from 'react'



const Home = () => {
    const [greeting, setGreeting] = useState<string>('')

    useEffect(() => {
        const date = new Date()
        const hours = date.getHours()
        if (hours < 12) {
            setGreeting('Good morning')
        } else if (hours < 18) {
            setGreeting('Good afternoon')
        } else {
            setGreeting('Good evening')
        }
    }, [])

    return (
        <div className="home">
            <h1 className='home__title'>Home</h1>
            <h1 className='home__greeting'>{greeting} Charlotte</h1>
            <WeatherInfo />
        </div>
    )
}

export default Home