// components/HeroSection.tsx
"use client";
import Image from "next/image";
import "./styles.css";

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-image">
        <Image
          src="/portada.webp"
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
    </section>
  );
};

export default HeroSection;
