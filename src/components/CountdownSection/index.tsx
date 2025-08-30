import React, { useEffect, useState } from "react";
import "./styles.css";
import NumberFlow from "@number-flow/react";

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const WEDDING_DATE = new Date("2025-12-20T00:19:30");

export default function CountdownSection() {
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

  const countdownItems = [
    { label: "DÍAS", value: countdown.days },
    { label: "HORAS", value: countdown.hours },
    { label: "MINUTOS", value: countdown.minutes },
    { label: "SEGUNDOS", value: countdown.seconds },
  ];

  return (
    <section className="reusable-section">
      <div className="countdown">
        {countdownItems.map((item, index) => (
          <React.Fragment key={index}>
            <div className="time-box">
              <NumberFlow value={item.value} className="value" />
              <small>{item.label}</small>
            </div>
            {/* if is last step dont show divider */}
            {index !== countdownItems.length - 1 && (
              <div className="divider">:</div>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
