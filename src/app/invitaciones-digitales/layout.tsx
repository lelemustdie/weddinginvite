"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import SimpleYouTubeAudio from "@/components/SimpleYoutubeAudio";
import Head from "next/head";

export default function InvitacionesLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    const isInInvitation = pathname?.startsWith("/invitaciones-digitales/CYM");

    return (
        <>
            <Head>
                <title>CELE Y MATEO</title>
                <meta name="description" content="¡NOS CASAMOS!" />
                <meta property="og:title" content="CELE Y MATEO" />
                <meta property="og:description" content="¡NOS CASAMOS!" />
                <meta property="og:image" content="https://lourdespontiroli.com/og/cover-v3.jpg" />
                <meta property="og:image:secure_url" content="https://lourdespontiroli.com/og/cover-v3.jpg" />
                <meta property="og:image:type" content="image/jpeg" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:alt" content="Cele y Mateo - Invitación de Boda" />
                <meta property="og:url" content="https://lourdespontiroli.com/invitaciones-digitales" />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="es_AR" />
                <meta property="og:site_name" content="Cele y Mateo - Boda" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="CELE Y MATEO" />
                <meta name="twitter:description" content="¡NOS CASAMOS!" />
                <meta name="twitter:image" content="https://lourdespontiroli.com/og/cover-v3.jpg" />
            </Head>

            <SimpleYouTubeAudio
                videoId="Q5z6RHIpi2Y"
                startTime={0}
                autoplay={false}
                showControls={isInInvitation}
            />
            {children}
        </>
    );
}