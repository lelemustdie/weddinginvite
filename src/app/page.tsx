import ReusableSection from "@/components/ReusableSection";
import HeroSection from "@/components/HeroSection";
import Itinerary from "@/components/Itinerary";
import { FaChurch } from "react-icons/fa"
import { GiPartyPopper } from "react-icons/gi"
import RowItems from "@/components/RowItems";
import PhotoCarousel, {CarouselImage} from "@/components/Carousel";
import RsvpForm from "@/components/RSVP";

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
            icon: <FaChurch size={40} />,
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

    return (
        <>
            <HeroSection/>
            <ReusableSection
                divisors={true}
                variant="green"
                title="El día más esperado de nuestras vidas está llegando…"
            />
            <ReusableSection
                variant="white"
                title="CUANDO"
                subtitle="20 DE DICIEMBRE DE 2025"

            />
            <ReusableSection
                variant="white"
                title="DONDE"
                subtitle="EL DORADO EVENTOS"
                button={{label: "COMO LLEGAR", href: "https://goo.gl/maps/xxxxx"}}
                //agregar foto debajo del donde antes del itinerario
            />
            <div>
                <Itinerary items={itineraryItems}/>
            </div>
            <ReusableSection
                variant="white"
                title="DRESSCODE"
                subtitle="ELEGANTE"
            />
            <ReusableSection
                variant="green"
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
                subtitle="Antes del 6 de noviembre"
                spotifyPlaylistUrl="https://open.spotify.com/playlist/xxxxxxxx" // tu playlist pública
                // onSubmit opcional: si no lo pasás, postea a /api/rsvp
                // onSubmit={async (data) => { await fetch(...); }}
            />
        </>
    );
}
