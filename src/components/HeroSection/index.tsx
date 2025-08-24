// components/HeroSection.tsx
"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import "./styles.css"

interface Countdown {
    days: number
    hours: number
    minutes: number
    seconds: number
}

const HeroSection = () => {
    const [countdown, setCountdown] = useState<Countdown>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    })

    // 📅 Ajusta esta fecha al día de la boda
    const weddingDate = new Date("2025-12-20T00:00:00")

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime()
            const distance = weddingDate.getTime() - now

            const days = Math.floor(distance / (1000 * 60 * 60 * 24))
            const hours = Math.floor(
                (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            )
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
            const seconds = Math.floor((distance % (1000 * 60)) / 1000)

            setCountdown({ days, hours, minutes, seconds })
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return (
        <section className="hero-section">
            <div className="hero-image">
                <Image
                    src="/heropic.jpeg"
                    alt="Boda"
                    fill
                    priority
                    className="hero-img"
                />
                <div className="overlay" />

                <div className="hero-content">
                    <p className="hero-subtitle">LLEGÓ EL DÍA</p>
                    <h1 className="hero-title">Cele y Mateo</h1>
                    <p className="hero-text">¡NOS CASAMOS!</p>
                </div>
            </div>

            <div className="countdown">
                <div className="time-box">
                    <span>{countdown.days}</span>
                    <small>DÍAS</small>
                </div>
                <div className="time-box">
                    <span>{countdown.hours}</span>
                    <small>HORAS</small>
                </div>
                <div className="time-box">
                    <span>{countdown.minutes}</span>
                    <small>MINUTOS</small>
                </div>
                <div className="time-box">
                    <span>{countdown.seconds}</span>
                    <small>SEGUNDOS</small>
                </div>
            </div>
        </section>
    )
}

export default HeroSection
