import { useState } from "react";
import { IoPlayOutline, IoPauseOutline } from "react-icons/io5";

export default function PlayPauseButton() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isReady, setIsReady] = useState(true); // Ajustá esto según tu lógica

    const togglePlayPause = () => {
        if (!isReady) return;
        setIsPlaying(!isPlaying);
    };

    return (
        <button
            onClick={togglePlayPause}
            disabled={!isReady}
            className="fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center transition-all z-50 disabled:opacity-50"
            style={{ backgroundColor: "#4d618a" }}
        >
            {isPlaying ? (
                <IoPauseOutline size={32} color="#ffffffff" />
            ) : (
                <IoPlayOutline size={32} color="#ffffffff" />
            )}
        </button>
    );
}
