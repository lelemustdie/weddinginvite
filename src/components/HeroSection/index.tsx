// components/HeroSection.tsx
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import "./styles.css";

interface Countdown {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

const WEDDING_DATE = new Date("2025-12-20T00:19:30");

const HeroSection = () => {
    const [countdown, setCountdown] = useState<Countdown>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const id = setInterval(() => {
            const now = Date.now();
            const distance = WEDDING_DATE.getTime() - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
                (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setCountdown({ days, hours, minutes, seconds });
        }, 1000);

        return () => clearInterval(id);
    }, []);

    return (
        <section className="hero-section">
            <div className="hero-image">
                <Image src="/portada.webp" alt="Boda" fill priority className="hero-img" />
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
    );
};

export default HeroSection;
