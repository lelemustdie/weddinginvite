"use client";

import { useRouter } from "next/navigation";

declare global {
    interface Window {
        musicPlayer?: {
            play: () => void;
            pause: () => void;
            stop: () => void;
            isPlaying: boolean;
        };
    }
}

export default function LandingInvitacion() {
    const router = useRouter();

    const handleEnter = () => {
        window.musicPlayer?.play?.();
        router.push("/invitaciones-digitales/CYM");
    };

    return (
        <main className="min-h-screen flex flex-col items-center justify-center text-center p-6">
            <h1
                className="text-4xl md:text-6xl tracking-wide"
                style={{
                    color: "var(--greenwedding, #9e9d83)",
                    fontWeight: 500,
                    fontFamily: "var(--font-cormorant-garamond)",
                    fontSize: "3rem",
                }}
            >
                Cele y Mateo
            </h1>

            {/*<p*/}
            {/*    className="mt-6 max-w-xl text-sm md:text-base tracking-widest"*/}
            {/*    style={{ color: "rgba(0,0,0,0.55)" }}*/}
            {/*>*/}
            {/*    EL CAMINO ES MÁS DIVERTIDO SI LO RECORREMOS JUNTOS*/}
            {/*</p>*/}

            <button
                onClick={handleEnter}
                className="mt-10 px-8 py-3 rounded-md text-white tracking-widest"
                style={{
                    backgroundColor: "var(--greenwedding, #9e9d83)",
                }}
                aria-label="Ingresar a la invitación"
            >
                INGRESAR
            </button>
        </main>
    );
}
