"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import "./styles.css";
import ChevronLeft from "@/icons/ChevronLeft";
import ChevronRight from "@/icons/ChevronRight";

export type CarouselImage = {
  src: string;
  alt: string;
  caption?: string;
};

interface PhotoCarouselProps {
  images: CarouselImage[];
  autoPlay?: boolean;
  interval?: number;
  showIndicators?: boolean;
  showArrows?: boolean;
  loop?: boolean;
  pauseOnHover?: boolean;
  className?: string;
  /** Ajustá alto relativo: "4 / 3", "1 / 1", "16 / 10", etc. */
  aspectRatio?: `${number} / ${number}`;
}

const clampIndex = (i: number, len: number) =>
    Math.max(0, Math.min(i, len - 1));

const PhotoCarousel = ({
                         images,
                         autoPlay = true,
                         interval = 4000,
                         showIndicators = true,
                         showArrows = true,
                         loop = true,
                         pauseOnHover = true,
                         className = "",
                         aspectRatio = "16 / 9", // por defecto
                       }: PhotoCarouselProps) => {
  const len = images?.length ?? 0;
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const canSlide = len > 1;

  const goTo = (i: number) => {
    if (!canSlide) return;
    if (loop) setIndex((i + len) % len);
    else setIndex(clampIndex(i, len));
  };

  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  useEffect(() => {
    if (!autoPlay || !canSlide) return;
    if (pauseOnHover && isPaused) return;
    const id = setInterval(next, interval);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay, canSlide, isPaused, index, interval]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const threshold = 40;
    if (dx < -threshold) next();
    if (dx > threshold) prev();
    touchStartX.current = null;
  };

  const trackStyle = useMemo(
      () => ({ transform: `translateX(-${index * 100}%)` }),
      [index]
  );

  if (!len) return null;

  return (
      <div
          className={`photo-carousel ${className}`}
          style={{ ["--ratio" as any]: aspectRatio }}
          onMouseEnter={() => pauseOnHover && setIsPaused(true)}
          onMouseLeave={() => pauseOnHover && setIsPaused(false)}
          aria-roledescription="carousel"
      >
        <div
            className="carousel-viewport"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
          <div className="carousel-track" style={trackStyle}>
            {images.map((img, i) => (
                <figure
                    className="carousel-slide"
                    key={i}
                    aria-hidden={i !== index}
                    aria-roledescription="slide"
                    aria-label={`${i + 1} de ${len}`}
                >
                  <img src={img.src} alt={img.alt} className="carousel-image" />
                  {img.caption && (
                      <figcaption className="carousel-caption">
                        {img.caption}
                      </figcaption>
                  )}
                </figure>
            ))}
          </div>
        </div>

        {showArrows && canSlide && (
            <>
              <button className="carousel-arrow left" onClick={prev} aria-label="Anterior">
                <ChevronLeft />
              </button>
              <button className="carousel-arrow right" onClick={next} aria-label="Siguiente">
                <ChevronRight />
              </button>
            </>
        )}

        {showIndicators && canSlide && (
            <div className="carousel-indicators" role="tablist" aria-label="Indicadores">
              {images.map((_, i) => (
                  <button
                      key={i}
                      className={`indicator-dot ${i === index ? "active" : ""}`}
                      onClick={() => goTo(i)}
                      role="tab"
                      aria-selected={i === index}
                      aria-label={`Ir al slide ${i + 1}`}
                  />
              ))}
            </div>
        )}
      </div>
  );
};

export default PhotoCarousel;
