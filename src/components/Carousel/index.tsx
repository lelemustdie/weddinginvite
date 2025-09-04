"use client";

import { useEffect, useMemo, useRef, useState, CSSProperties } from "react";
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
  aspectRatio?: `${number} / ${number}`;
  height?: string;
}

type CSSVarStyle = CSSProperties & {
  ["--ratio"]?: string;
  ["--height"]?: string;
  ["--tx"]?: string; // transición del track (podemos anularla en “teleport”)
};

const clampIndex = (i: number, len: number) =>
    Math.max(0, Math.min(i, len - 1));

const PhotoCarousel = ({
                         images,
                         autoPlay = false,
                         interval = 16000,
                         showIndicators = true,
                         showArrows = true,
                         loop = true,
                         pauseOnHover = true,
                         className = "",
                         aspectRatio = "16 / 9",
                         height,
                       }: PhotoCarouselProps) => {
  const len = images?.length ?? 0;
  const canSlide = len > 1;

  // cuando hay loop con clones, el índice visible arranca en 1 (0 es clon del último)
  const initialIndex = loop && canSlide ? 1 : 0;

  const [index, setIndex] = useState(initialIndex);
  const [isPaused, setIsPaused] = useState(false);
  const [noTransition, setNoTransition] = useState(false); // para “teleport”
  const touchStartX = useRef<number | null>(null);

  // array mostrado (con clones si aplica)
  const displayed = useMemo(() => {
    if (loop && canSlide) {
      return [images[len - 1], ...images, images[0]];
    }
    return images;
  }, [images, len, loop, canSlide]);

  const maxIndex = displayed.length - 1;

  // const goTo = (i: number) => {
  //   if (!canSlide) return;
  //   if (loop) {
  //     // con clones: permitimos ir a extremos (0 y maxIndex) para usar el clon
  //     setNoTransition(false);
  //     setIndex(i);
  //   } else {
  //     setIndex(clampIndex(i, len));
  //   }
  // };

  const next = () => {
    if (!canSlide) return;
    if (loop) {
      setNoTransition(false);
      setIndex((prev) => prev + 1);
    } else {
      setIndex((prev) => clampIndex(prev + 1, len));
    }
  };

  const prev = () => {
    if (!canSlide) return;
    if (loop) {
      setNoTransition(false);
      setIndex((prev) => prev - 1);
    } else {
      setIndex((prev) => clampIndex(prev - 1, len));
    }
  };

  // autoplay
  useEffect(() => {
    if (!autoPlay || !canSlide) return;
    if (pauseOnHover && isPaused) return;
    const id = setInterval(next, interval);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay, canSlide, isPaused, index, interval]);

  // teclado
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  // touch
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

  // track transform y transición
  const trackStyle: CSSVarStyle = useMemo(
      () => ({
        transform: `translateX(-${index * 100}%)`,
        // por defecto usa el transition del CSS; si noTransition => anular
        ...(noTransition ? { ["--tx"]: "none" } : {}),
      }),
      [index, noTransition]
  );

  // “teleport” al cruzar clones (solo con loop)
  const handleTransitionEnd = () => {
    if (!(loop && canSlide)) return;

    if (index === 0) {
      // estábamos en el clon del último => saltamos al real (len)
      setNoTransition(true);
      setIndex(len); // slide real del último
      // en el próximo render, la transición estará desactivada (no salta)
      // luego volvemos a permitir transiciones
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setNoTransition(false));
      });
    } else if (index === maxIndex) {
      // clon del primero => saltamos al real (1)
      setNoTransition(true);
      setIndex(1);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setNoTransition(false));
      });
    }
  };

  if (!len) return null;

  const containerStyle: CSSVarStyle = {
    "--ratio": aspectRatio,
    ...(height ? { "--height": height } : {}),
  };

  // índice real para indicadores y aria (0..len-1)
  const realIndex = loop && canSlide ? (index - 1 + len) % len : index;

  return (
      <div
          className={`photo-carousel ${className}`}
          style={containerStyle}
          onMouseEnter={() => pauseOnHover && setIsPaused(true)}
          onMouseLeave={() => pauseOnHover && setIsPaused(false)}
          aria-roledescription="carousel"
      >
        <div
            className="carousel-viewport"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
          <div
              className="carousel-track"
              style={trackStyle}
              onTransitionEnd={handleTransitionEnd}
          >
            {displayed.map((img, i) => (
                <figure
                    className="carousel-slide"
                    key={i}
                    aria-hidden={i !== index}
                    aria-roledescription="slide"
                    aria-label={`${realIndex + 1} de ${len}`}
                >
                  <img src={img.src} alt={img.alt} className="carousel-image" />
                  {img.caption && (
                      <figcaption className="carousel-caption">{img.caption}</figcaption>
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
                      className={`indicator-dot ${i === realIndex ? "active" : ""}`}
                      onClick={() => {
                        if (loop && canSlide) {
                          // nuestros “índices visibles” van de 1..len
                          const target = i + 1;
                          setNoTransition(false);
                          setIndex(target);
                        } else {
                          setIndex(i);
                        }
                      }}
                      role="tab"
                      aria-selected={i === realIndex}
                      aria-label={`Ir al slide ${i + 1}`}
                  />
              ))}
            </div>
        )}
      </div>
  );
};

export default PhotoCarousel;
