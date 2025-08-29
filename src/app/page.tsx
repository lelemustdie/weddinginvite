"use client"

import ReusableSection from "@/components/ReusableSection";
import HeroSection from "@/components/HeroSection";
import Itinerary from "@/components/Itinerary";
import RowItems from "@/components/RowItems";
import PhotoCarousel, {CarouselImage} from "@/components/Carousel";
import RsvpForm from "@/components/RSVP";
import calendarGif from "../../public/valentines-day.gif"
import partyGif from "../../public/disco-ball.gif"
import dresscodeGif from "../../public/dress.gif"
import locationGif from "../../public/google-maps.gif"
import churchGif from "../../public/church.gif"
import honeymoonGif from "../../public/personalized-honeymoons.gif"
import heroImage from "../../public/Si.webp"
import cameraGif from  "../../public/camera.gif"
import SimpleYouTubeAudio from "@/components/SimpleYoutubeAudio";
import endPhoto from "../../public/final.webp"
import Modal from "@/components/Modal";
import {useState} from "react";
import Image from "next/image";


export default function Home() {

    const [isModalOpen, setIsModalOpen] = useState(false)

    const demoImages: CarouselImage[] = [
        { src: "/images/wedding/ceremony.jpg", alt: "Ceremonia al aire libre" },
        { src: "/images/wedding/couple.jpg", alt: "Pareja en el atardecer" },
        { src: "/images/wedding/venue.jpg", alt: "Salón de recepción" },
        { src: "/images/wedding/drinks.jpg", alt: "Barra de tragos" },
        { src: "/images/wedding/dance.jpg", alt: "Pista de baile" },
    ]

    const itineraryItems = [
        {
            icon: {churchGif},
            title: "CEREMONIA",
            time: "21:00 HS",
            button: { label: "VER MAPA", href: "https://maps.google.com" },
        },
        {
            icon: {partyGif},
            title: "CELEBRACIÓN",
            time: "22:00 HS",
            button: { label: "VER MAPA", href: "https://maps.google.com" },
        },
    ]

    const youtubeConfig = {
        videoId: "Q5z6RHIpi2Y", // Replace with your actual video ID
        startTime: 0, // Start from beginning or specify seconds
        autoplay: true, // Set to true if you want music to start automatically
        showControls: true // Show the floating play/pause button
    };

    return (
        <>
            <SimpleYouTubeAudio
                videoId={youtubeConfig.videoId}
                startTime={youtubeConfig.startTime}
                autoplay={youtubeConfig.autoplay}
                showControls={youtubeConfig.showControls}
            />
            <HeroSection/>
            <ReusableSection
                divisors={true}
                variant="green"
                title="EL DÍA MÁS ESPERADO DE NUESTRA VIDA ESTÁ LLEGANDO"
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
                button={{label: "COMO LLEGAR", href: "https://maps.app.goo.gl/BXhA3dNBhqB2V4PG7"}}
                //agregar foto debajo del donde antes del itinerario
            />
            <div className="flex flex-col align-middle justify-center items-center">
                <Itinerary items={itineraryItems}/>
            </div>
            <ReusableSection
                variant="white"
                icon={dresscodeGif}
                title="DRESSCODE"
                subsubsubtitle="EL BLANCO ES UN COLOR HERMOSO, PERO EN NUESTRA BODA ES EXCLUSIVO PARA LA NOVIA"
                subtitle="FORMAL ELEGANTE"
            />
            <>
                <ReusableSection
                    title="LUNA DE MIEL"
                    icon={honeymoonGif}
                    subtitle="SI DESEAN HACERNOS UN OBSEQUIO, PUEDEN CONTRIBUIR A NUESTRA LUNA DE MIEL"
                    variant="green"
                    button={{
                        label: "VER DETALLE",
                        onClick: () => setIsModalOpen(true), // 👉 abre modal
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
                subtitle="PUEDEN USAR NUESTRO #BODACELEYMATEO EN TODAS SUS PUBLICACIONES DE INSTAGRAM"
            />
            <section style={{maxWidth: 1100, margin: "0 auto"}}>
                <PhotoCarousel
                    images={demoImages}
                    autoPlay
                    interval={4500}
                    showIndicators
                    showArrows
                    loop
                    pauseOnHover
                />
            </section>
            <ReusableSection
                divisors={true}
                variant="green"
                title="ACOMPÁÑANOS EN NUESTRO CASAMIENTO Y SEAN PARTE DE NUESTRA HISTORIA DE AMOR"
            />
            <RowItems/>
            <RsvpForm
                title="CONFIRMÁ TU ASISTENCIA"
                subtitle="Antes del 20 de noviembre"
                spotifyPlaylistUrl="https://open.spotify.com/playlist/1bmVQdbMVSfm1V8JZf8v4u?si=cPWczp6bRYWGXIVlwASPFw&pi=PSsa8S8EQPGS-&pt=912fb05830f43768e1ca8180e296d2ff"
                googleScriptUrl="https://script.google.com/macros/s/AKfycbyes3bQhihd8kU-vvc2HLBUQ6qNT8pdbOxhrM7ASVUWciPu4hqSBpBTWWeIyaMB3eI/exec"
            />
            <div className="relative w-full h-[450px] md:h-[650px] lg:h-[850px]">
                <Image
                    src={endPhoto}
                    alt="novios"
                    fill
                    className="object-cover"
                />

                <div
                    className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black/30">
                    <h2 className="hero-title !text-5xl">Cele y Mateo</h2>
                    <p className="mt-2 text-sm md:text-base tracking-wide">
                        JUNTOS COMENZAMOS <br/> ESTE VIAJE LLAMADO PARA SIEMPRE.
                    </p>
                </div>
            </div>
        </>
    );
}
