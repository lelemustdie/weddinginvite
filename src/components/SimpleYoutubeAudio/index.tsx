"use client"
import { useEffect, useRef, useState } from 'react';
import {IoPauseOutline, IoPlayOutline} from "react-icons/io5";

// Define YouTube Player types
declare global {
    interface Window {
        YT: any;
        onYouTubeIframeAPIReady: () => void;
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
                                               showControls = true
                                           }: SimpleYouTubeAudioProps) {
    const playerRef = useRef<HTMLDivElement>(null);
    const [player, setPlayer] = useState<any>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        // Load YouTube IFrame API
        const loadYouTubeAPI = () => {
            if (window.YT && window.YT.Player) {
                initializePlayer();
                return;
            }

            // Create script tag if it doesn't exist
            if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
                const script = document.createElement('script');
                script.src = 'https://www.youtube.com/iframe_api';
                script.async = true;
                document.head.appendChild(script);
            }

            // Set up the callback
            window.onYouTubeIframeAPIReady = initializePlayer;
        };

        const initializePlayer = () => {
            if (!playerRef.current || !window.YT) return;

            const newPlayer = new window.YT.Player(playerRef.current, {
                height: '1',
                width: '1',
                videoId: videoId,
                playerVars: {
                    'start': startTime,
                    'autoplay': autoplay ? 1 : 0,
                    'rel': 0,
                    'playsinline': 1,
                    'controls': 0
                },
                events: {
                    onReady: () => {
                        setIsReady(true);
                    },
                    onStateChange: (event: any) => {
                        setIsPlaying(event.data === 1); // 1 = playing
                    }
                }
            });

            setPlayer(newPlayer);
        };

        loadYouTubeAPI();

        return () => {
            if (player) {
                try {
                    player.destroy();
                } catch (error) {
                    console.log('Error destroying player:', error);
                }
            }
        };
    }, [videoId, startTime, autoplay]);

    const togglePlayPause = () => {
        if (!player) return;

        if (isPlaying) {
            player.pauseVideo();
        } else {
            player.playVideo();
        }
    };

    const startMusic = () => {
        if (player && isReady) {
            player.playVideo();
        }
    };

    // Expose functions for external use
    useEffect(() => {
        // You can access these functions from parent components
        (window as any).musicPlayer = {
            play: () => player?.playVideo(),
            pause: () => player?.pauseVideo(),
            stop: () => player?.stopVideo(),
            isPlaying: isPlaying
        };
    }, [player, isPlaying]);

    return (
        <div className={className}>
            {/* Hidden YouTube player - positioned absolutely and invisible */}
            <div
                ref={playerRef}
                style={{
                    position: 'absolute',
                    left: '-9999px',
                    width: '1px',
                    height: '1px',
                    opacity: 0,
                    pointerEvents: 'none'
                }}
            />

            {/* Simple Play/Pause Button */}
            {showControls && (
                <button
                    onClick={togglePlayPause}
                    disabled={!isReady}
                    className="fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center transition-all z-50 disabled:opacity-50"
                    style={{backgroundColor: "#5a698f"}}
                >
                    {isPlaying ? (
                        <IoPauseOutline size={32} color="#ffffffff"/>
                    ) : (
                        <IoPlayOutline size={32} color="#ffffffff"/>
                    )}
                </button>
            )}
        </div>
    );
}