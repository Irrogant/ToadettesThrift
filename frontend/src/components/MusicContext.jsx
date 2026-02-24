import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the MusicContext
const MusicContext = createContext();

// MusicContext provider component
export const MusicProvider = ({ children }) => {
    const [currentTrack, setCurrentTrack] = useState(null); // Current track state
    const [isPlaying, setIsPlaying] = useState(false);     // Track play/pause state
    const [audio, setAudio] = useState(null);               // Audio element

    // Effect to create an audio element and handle playing/pausing
    useEffect(() => {
        if (currentTrack) {
            const newAudio = new Audio(currentTrack); // Create new audio element for the track
            setAudio(newAudio);

            newAudio.onended = () => {
                setIsPlaying(false);
            };

            newAudio.play().catch((err) => console.error("Error playing track: ", err));

            // Clean up function when the track changes or the component unmounts
            return () => {
                newAudio.pause(); // Pause the audio
                newAudio.src = ''; // Clean up the previous audio
            };
        }
    }, [currentTrack]); // Runs whenever the currentTrack changes

    // Play the selected track
    const playTrack = (track) => {
        console.log(`Attempting to play track: ${track}`);

        // If the track is different, set it as the new current track
        if (currentTrack !== track) {
            if (audio) {
                audio.pause();  // Pause the current track before switching
            }
            setCurrentTrack(track);  // Update to the new track
            setIsPlaying(true);      // Start playing the new track
        } else {
            // If the track is the same, toggle the play/pause state
            if (isPlaying) {
                setIsPlaying(false);
            } else {
                audio.play().catch((err) => console.error("Error playing track: ", err));
                setIsPlaying(true);
            }
        }
    };

    return (
        <MusicContext.Provider value={{ playTrack, isPlaying, currentTrack }}>
            {children}
        </MusicContext.Provider>
    );
};

// Custom hook to use the MusicContext
export const useMusic = () => {
    return useContext(MusicContext);
};