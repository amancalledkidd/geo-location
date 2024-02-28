import WeatherInfo from '../WeatherInfo/WeatherInfo'
import './Home.scss'



const Home = () => {


    return (
        <div className="home">
            <h1 className='home__title'>Home</h1>
            <WeatherInfo />
        </div>
    )
}

export default Home