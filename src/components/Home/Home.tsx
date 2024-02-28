import './Home.scss'


const Home = () => {

navigator.geolocation.getCurrentPosition((position) => {
        console.log(position)
    })


    return (
        <div className="home">
            <h1 className='home__title'>Home</h1>
        </div>
    )
}

export default Home