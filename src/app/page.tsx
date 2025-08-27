import ReusableSection from "@/components/ReusableSection";
import HeroSection from "@/components/HeroSection";
import Itinerary from "@/components/Itinerary";
import { FaChurch } from "react-icons/fa"
import { GiPartyPopper } from "react-icons/gi"
import RowItems from "@/components/RowItems";
import PhotoCarousel, {CarouselImage} from "@/components/Carousel";
import RsvpForm from "@/components/RSVP";
import calendarGif from "../../public/valentines-day.gif"
import partyGif from "../../public/disco-ball.gif"
import dresscodeGif from "../../public/dress.gif"
import locationGif from "../../public/google-maps.gif"
import churchGif from "../../public/church.gif"
import honeymoonGif from "../../public/personalized-honeymoons.gif"
import SimpleYouTubeAudio from "@/components/SimpleYoutubeAudio";


export default function Home() {

    const demoImages: CarouselImage[] = [
        { src: "/images/wedding/ceremony.jpg", alt: "Ceremonia al aire libre", caption: "Ceremonia" },
        { src: "/images/wedding/couple.jpg", alt: "Pareja en el atardecer", caption: "Los novios ♥" },
        { src: "/images/wedding/venue.jpg", alt: "Salón de recepción", caption: "Recepción" },
        { src: "/images/wedding/drinks.jpg", alt: "Barra de tragos", caption: "Barra de tragos" },
        { src: "/images/wedding/dance.jpg", alt: "Pista de baile", caption: "La fiesta" },
    ]

    const itineraryItems = [
        {
            icon: {churchGif},
            title: "CEREMONIA",
            time: "21:00 HS",
            button: { label: "VER MAPA", href: "https://maps.google.com" },
        },
        {
            icon: <GiPartyPopper size={40} />,
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
                title="El día más esperado de nuestras vidas está llegando…"
            />
            <ReusableSection
                variant="white"
                icon={calendarGif}
                title="¿CUÁNDO?"
                subtitle="20 DE DICIEMBRE DE 2025"

            />
            <ReusableSection
                variant="white"
                icon={locationGif}
                title="¿DÓNDE?"
                subtitle="EL DORADO EVENTOS"
                button={{label: "COMO LLEGAR", href: "https://maps.app.goo.gl/kTaqA5igPMeoXhdc6?g_st=awb"}}
                //agregar foto debajo del donde antes del itinerario
            />
            <div className="flex flex-col align-center">
                <Itinerary items={itineraryItems}/>
            </div>
            <ReusableSection
                variant="white"
                icon={dresscodeGif}
                title="DRESSCODE: ELEGANTE"
                subtitle="EL BLANCO ES UN COLOR HERMOSO, PERO EN NUESTRA BODA ES EXCLUSIVO PARA LA NOVIA"
            />
            <ReusableSection
                variant="green"
                icon={honeymoonGif}
                title="LUNA DE MIEL"
                subtitle="SI DESEAN HACERNOS UN OBSEQUIO, PUEDEN CONTRIBUIR A NUESTRA LUNA DE MIEL"
                //AGREGAR BUTTON DE MODAL
            />
            <ReusableSection
                variant="white"
                title="QUEREMOS VER TUS FOTOS"
                subtitle="PUEDEN USAR NUESTRO # EN TODAS SUS PUBLICACIONES DE INSTAGRAM #BODACELEYMATEO"
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
                title="FRASE PARA CORTAR"
            />
            <RowItems/>
            <RsvpForm
                title="CONFIRMÁ TU ASISTENCIA"
                subtitle="Antes del 20 de noviembre"
                spotifyPlaylistUrl="https://open.spotify.com/playlist/xxxxxxxx"
                googleScriptUrl="https://script.google.com/macros/s/AKfycbyes3bQhihd8kU-vvc2HLBUQ6qNT8pdbOxhrM7ASVUWciPu4hqSBpBTWWeIyaMB3eI/exec"
            />
        </>
    );
}
