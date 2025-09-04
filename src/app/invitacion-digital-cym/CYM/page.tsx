"use client";

import ReusableSection from "@/components/ReusableSection";
import HeroSection from "@/components/HeroSection";
import Itinerary from "@/components/Itinerary";
import RowItems from "@/components/RowItems";
import PhotoCarousel, { CarouselImage } from "@/components/Carousel";
import RsvpForm from "@/components/RSVP";
import calendarGif from "../../../../public/valentines-day.gif";
import partyGif from "../../../../public/disco-ball.gif";
import dresscodeGif from "../../../../public/dress.gif";
import locationGif from "../../../../public/google-maps.gif";
import honeymoonGif from "../../../../public/personalized-honeymoons.gif";
import ceremonyGif from "../../../../public/marriage.gif";
import cameraGif from "../../../../public/camera.gif";
import endPhoto from "../../../../public/anillos.webp";
import toastGif from "../../../../public/toast.gif";
import Modal from "@/components/Modal";
import { useState } from "react";
import Image from "next/image";
import CountdownSection from "@/components/CountdownSection";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const demoImages: CarouselImage[] = [
    { src: "/playa.webp", alt: "novios" },
    { src: "/alas.webp", alt: "novios" },
    { src: "/atardecer.webp", alt: "novios" },
    { src: "/car3.webp", alt: "novios" },
    { src: "/final.webp", alt: "novios" },
    { src: "/Si.webp", alt: "novios" }
  ];

  const itineraryItems = [
    {
      icon: ceremonyGif,
      title: "CEREMONIA",
      time: "20:00 HS",
    },
    {
      icon: toastGif,
      title: "RECEPCIÓN",
      time: "21:00 HS",
    },
    {
      icon: partyGif,
      title: "CELEBRACIÓN",
      time: "22:00 HS",
    },
  ];

  return (
      <>
        <HeroSection/>
        <CountdownSection/>
        <ReusableSection
            divisors={true}
            variant="green"
            title="EL DÍA MÁS IMPORTANTE DE NUESTRAS VIDAS ESTÁ LLEGANDO"
        />
        <ReusableSection
            variant="white"
            icon={calendarGif}
            title="¿CUÁNDO?"
            subtitle="20 DE DICIEMBRE DE 2025"
            subsubtitle="19:30 HS"
        />
        <ReusableSection
            variant="white"
            icon={locationGif}
            title="¿DÓNDE?"
            subtitle="EL DORADO EVENTOS"
            subtitleClassName="highlighted-text-event"

            button={{
              label: "COMO LLEGAR",
              href: "https://maps.app.goo.gl/BXhA3dNBhqB2V4PG7",
            }}
            //agregar foto debajo del donde antes del itinerario
        />
        <ReusableSection
            variant="white"
            icon={dresscodeGif}
            title="DRESSCODE"
            subsubsubtitle="EL BLANCO ES UN COLOR HERMOSO, PERO EN NUESTRA BODA ES EXCLUSIVO PARA LA NOVIA"
            subtitleClassName="highlighted-text"
            subtitle="FORMAL ELEGANTE"
        />
        <div className="flex flex-col align-middle justify-center items-center md:mb-5">
          <Itinerary items={itineraryItems}/>
        </div>

        <>
          <ReusableSection
              title="LUNA DE MIEL"
              icon={honeymoonGif}
              subtitle="SI DESEAN HACERNOS UN OBSEQUIO, PUEDEN CONTRIBUIR A NUESTRA LUNA DE MIEL"
              variant="green"
              button={{
                label: "VER DETALLE",
                onClick: () => setIsModalOpen(true),
              }}
          />

          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <Image src={honeymoonGif} alt="honeymoonGif" width={60} height={60}/>
            <h1 className="font-bold text-lg">LUNA DE MIEL</h1>
            <strong>ALIAS:</strong>
            <p>bodaceleymateo</p>
            <strong>CVU:</strong>
            <p>0000003100053521200109</p>
            <strong>TITULAR:</strong>
            <p>Ninfa Natalia Franco Contrera</p>
          </Modal>
        </>

        <ReusableSection
            icon={cameraGif}
            variant="white"
            title="QUEREMOS VER TUS FOTOS"
            subtitleClassName="highlighted-text"
            subtitle="#bodaceleymateo"
            subsubsubtitle="ÚSALO EN TODAS LAS PUBLICACIONES DE TUS REDES"
        />
          <ReusableSection
              icon="/music.gif"
              title="SUMÁ TU MÚSICA"
              subtitle="HAGAMOS UNA PLAYLIST JUNTOS"
              button={{
                label: "ABRIR SPOTIFY",
                href: "https://open.spotify.com/playlist/1bmVQdbMVSfm1V8JZf8v4u?si=cPWczp6bRYWGXIVlwASPFw&pi=PSsa8S8EQPGS-&pt=912fb05830f43768e1ca8180e296d2ff",
              }}
          />
        <section style={{maxWidth: 1100, margin: "20px auto"}}>
          <PhotoCarousel
              images={demoImages}
              autoPlay={true}
              interval={5200}
              showIndicators
              showArrows
              loop
              pauseOnHover
              aspectRatio="4 / 3"
          />
        </section>
        <ReusableSection
            divisors={true}
            variant="green"
            title="ACOMPÁÑANOS EN NUESTRO CASAMIENTO Y FORMÁ PARTE DE NUESTRA HISTORIA DE AMOR"
        />
        <RowItems/>
        <RsvpForm
            title="CONFIRMÁ TU ASISTENCIA"
            subtitle="Antes del 20 de noviembre"
            googleScriptUrl="https://script.google.com/macros/s/AKfycbyes3bQhihd8kU-vvc2HLBUQ6qNT8pdbOxhrM7ASVUWciPu4hqSBpBTWWeIyaMB3eI/exec"
        />
        <div className="relative w-full h-[450px] md:h-[650px] lg:h-[850px]">
          <Image src={endPhoto} alt="novios" fill className="object-cover"/>

          <div
              className="absolute inset-0 flex flex-col items-center justify-start md:pt-[10rem] pt-[4rem] text-center text-white bg-black/30">
            <h2 className="hero-title !text-5xl">Cele y Mateo</h2>
            <p className="mt-2 text-sm md:text-base tracking-wide">
              JUNTOS COMENZAMOS <br/> ESTE VIAJE LLAMADO PARA SIEMPRE
            </p>
          </div>
        </div>
      </>
  );
}
