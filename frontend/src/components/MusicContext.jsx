import { createContext, useState, useContext } from 'react';

// Create context
const MusicContext = createContext();

// Create provider component
export const MusicProvider = ({ children }) => {
    const [isMusicPlaying, setIsMusicPlaying] = useState(false);
    const [currentAudio, setCurrentAudio] = useState(null); // Track the current audio

    const playMusic = (audioRef) => {
        if (currentAudio) {
            currentAudio.pause(); // Stop the previous audio
            currentAudio.currentTime = 0;
        }
        setCurrentAudio(audioRef);
        audioRef.play().catch(() => console.log("Autoplay blocked"));
        setIsMusicPlaying(true);
    };

    const stopMusic = () => {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }
        setIsMusicPlaying(false);
    };

    return (
        <MusicContext.Provider value={{ isMusicPlaying, playMusic, stopMusic }}>
            {children}
        </MusicContext.Provider>
    );
};

// Custom hook to use music context
export const useMusic = () => useContext(MusicContext);