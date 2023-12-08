import React, { useState, useEffect } from 'react';
import './CountdownTimer.css';
import Header from '../Header';
import Footer from '../Footer';

const CountdownTimer = () => {
    const [countdown, setCountdown] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    const calculateCountdown = () => {
        const halvingDate = new Date('May 10, 2024 00:00:00 GMT'); // Coloque a data do próximo halving aqui
        const currentDate = new Date();
        const difference = halvingDate - currentDate;

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            setCountdown({
                days,
                hours,
                minutes,
                seconds,
            });
        }
    };

    useEffect(() => {
        const interval = setInterval(calculateCountdown, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="countdown-container">
            <Header />
            <h1>Contagem Regressiva para o Próximo Halving do Bitcoin</h1>
            <div className="countdown-section">
                <span>{countdown.days}</span>
                <span className="label">Dias</span>
            </div>
            <div className="countdown-section">
                <span>{countdown.hours}</span>
                <span className="label">Horas</span>
            </div>
            <div className="countdown-section">
                <span>{countdown.minutes}</span>
                <span className="label">Minutos</span>
            </div>
            <div className="countdown-section">
                <span>{countdown.seconds}</span>
                <span className="label">Segundos</span>
            </div>
            <Footer />
        </div>
    );
};

export default CountdownTimer;
