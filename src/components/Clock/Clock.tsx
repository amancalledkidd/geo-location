import './Clock.scss'
import { useEffect, useState } from 'react'

const Clock = () => {
    const [time, setTime] = useState<string>('')
    const [date, setDate] = useState<string>('')

    useEffect(() => {
        const interval = setInterval(() => {
            const date = new Date()
            const hours = date.getHours()
            const minutes = date.getMinutes()
            const seconds = date.getSeconds()
            setTime(`${hours}:${minutes}:${seconds}`)
            setDate(date.toDateString())
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="clock">
            <p className="clock__time">{time}</p>
            <p className="clock__date">{date}</p>
        </div>
    )
}

export default Clock
