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

            // Automatically start playing the track if it is the selected one
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

        // If a track is currently playing and it's different from the new track, stop the current one
        if (audio && currentTrack !== track) {
            audio.pause();  // Pause the current track
            setIsPlaying(false);  // Update play state
        }

        // Only change the track if it's different from the current one
        if (track !== currentTrack) {
            setCurrentTrack(track); // Set the new track
        } else {
            // If the track is the same, toggle the play/pause state
            if (isPlaying) {
                audio.pause();
                setIsPlaying(false);
            } else {
                audio.play().catch((err) => console.error("Error playing track: ", err));
                setIsPlaying(true);
            }
        }
    };

    // Stop the current track
    const stopTrack = () => {
        console.log('Stopping CURRENT track:', audio);
        if (audio) {
            audio.pause();
            setIsPlaying(false);
            setCurrentTrack(null);  // Clear the current track
        }
    };

    return (
        <MusicContext.Provider value={{ playTrack, stopTrack, isPlaying, currentTrack }}>
            {children}
        </MusicContext.Provider>
    );
};

// Custom hook to use the MusicContext
export const useMusic = () => {
    return useContext(MusicContext);
};