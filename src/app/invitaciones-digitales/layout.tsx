"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import SimpleYouTubeAudio from "@/components/SimpleYoutubeAudio";

export default function InvitacionesLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    const isInInvitation = pathname?.startsWith("/invitaciones-digitales/CYM");

    return (
        <>
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
