// components/SimpleYoutubeAudio/index.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { IoPauseOutline, IoPlayOutline } from "react-icons/io5";

// Tipos mínimos para el Player de YouTube
type YTPlayerStateCode = -1 | 0 | 1 | 2 | 3 | 5;

interface YTPlayer {
    playVideo: () => void;
    pauseVideo: () => void;
    stopVideo: () => void;
    destroy: () => void;
}

interface YTPlayerOptions {
    height?: string | number;
    width?: string | number;
    videoId: string;
    playerVars?: Record<string, unknown>;
    events?: {
        onReady?: (e: { target: YTPlayer }) => void;
        onStateChange?: (e: { data: YTPlayerStateCode }) => void;
    };
}

interface YTNamespace {
    Player: new (el: HTMLElement | string, opts: YTPlayerOptions) => YTPlayer;
    PlayerState: { PLAYING: 1 };
}

declare global {
    interface Window {
        YT?: YTNamespace;
        onYouTubeIframeAPIReady?: () => void;
        musicPlayer?: {
            play: () => void;
            pause: () => void;
            stop: () => void;
            isPlaying: boolean;
        };
    }
}

interface SimpleYouTubeAudioProps {
    videoId: string;
    startTime?: number;
    autoplay?: boolean;
    className?: string;
    showControls?: boolean;
}

export default function SimpleYouTubeAudio({
                                               videoId,
                                               startTime = 0,
                                               autoplay = true,
                                               className = "",
                                               showControls = true,
                                           }: SimpleYouTubeAudioProps) {
    const mountRef = useRef<HTMLDivElement>(null);
    const [player, setPlayer] = useState<YTPlayer | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const initializePlayer = () => {
            if (!mountRef.current || !window.YT) return;

            const newPlayer = new window.YT.Player(mountRef.current, {
                height: "1",
                width: "1",
                videoId,
                playerVars: {
                    start: startTime,
                    autoplay: autoplay ? 1 : 0,
                    rel: 0,
                    playsinline: 1,
                    controls: 0,
                },
                events: {
                    onReady: () => {
                        setIsReady(true);
                    },
                    onStateChange: (event) => {
                        const playingCode =
                            window.YT?.PlayerState?.PLAYING ?? (1 as const);
                        setIsPlaying(event.data === playingCode);
                    },
                },
            });

            setPlayer(newPlayer);
        };

        // Cargar la IFrame API si hace falta y luego inicializar
        const ensureYouTubeAPI = () => {
            if (window.YT && window.YT.Player) {
                initializePlayer();
                return;
            }
            if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
                const script = document.createElement("script");
                script.src = "https://www.youtube.com/iframe_api";
                script.async = true;
                document.head.appendChild(script);
            }
            window.onYouTubeIframeAPIReady = initializePlayer;
        };

        ensureYouTubeAPI();

        return () => {
            // destruir si existe
            if (player) {
                try {
                    player.destroy();
                } catch (err) {
                    // no-op
                }
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoId, startTime, autoplay]); // no incluimos `player` para no re-inicializarlo

    const togglePlayPause = () => {
        if (!player) return;
        if (isPlaying) {
            player.pauseVideo();
        } else {
            player.playVideo();
        }
    };

    // Exponer funciones globales (como estaba)
    useEffect(() => {
        window.musicPlayer = {
            play: () => player?.playVideo(),
            pause: () => player?.pauseVideo(),
            stop: () => player?.stopVideo(),
            isPlaying,
        };
    }, [player, isPlaying]);

    return (
        <div className={className}>
            {/* player escondido */}
            <div
                ref={mountRef}
                style={{
                    position: "absolute",
                    left: "-9999px",
                    width: "1px",
                    height: "1px",
                    opacity: 0,
                    pointerEvents: "none",
                }}
            />

            {showControls && (
                <button
                    onClick={togglePlayPause}
                    disabled={!isReady}
                    className="fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center transition-all z-50 disabled:opacity-50"
                    style={{ backgroundColor: "#5a698f" }}
                    aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
                >
                    {isPlaying ? (
                        <IoPauseOutline size={32} color="#ffffffff" />
                    ) : (
                        <IoPlayOutline size={32} color="#ffffffff" />
                    )}
                </button>
            )}
        </div>
    );
}
