import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// A list of random, goofy MLG-style words for each letter (no spaces, no special characters)
const randomWords = {
    A: ['Aimbot', 'Awooga', 'Ahh', 'Amogus', 'Ayylmao'],
    B: ['Bacon', 'Boi', 'BigChungus', 'Baka', 'Bamboozled'],
    C: ['Clutch', 'Creeper', 'Cursed', 'Cringe', 'Chillax'],
    D: ['Dank', 'Doge', 'Dab', 'Despacito', 'DogeCoin'],
    E: ['Epic', 'Ewok', 'EzClap', 'Eyy'],
    F: ['FidgetSpinner', 'Frodo', 'FazeClan', 'FOMO', 'Floss'],
    G: ['GodMode', 'Gamer', 'Gibberish', 'GG'],
    H: ['Hype', 'HogRider', 'HeckYeah', 'HeckYeah'],
    I: ['ItsYaBoi', 'ImAGamer', 'InternetExplorer'],
    J: ['Jeez', 'Jebaited', 'JigglePhysics', 'Jank', 'Juicy'],
    K: ['Kappa', 'Kermit', 'Kangaroo', 'Kek', 'Kraken'],
    L: ['Lmao', 'Lulz', 'LeEpic', 'Lag', 'LOL'],
    M: ['MLG', 'Meme', 'MemeLord', 'Miner'],
    N: ['Noob', 'NANI', 'Nerf', 'NyanCat', 'NoScope'],
    O: ['OMG', 'Overpowered', 'Omega', 'Oof', 'Oblivious'],
    P: ['PewDiePie', 'ProGamer', 'Poggers', 'Pwned', 'PogChamp'],
    Q: ['Qwerty', 'Quickscope', 'Queso', 'Quack'],
    R: ['RageQuit', 'Rickroll', 'Rip', 'Rawwwr', 'Rekt'],
    S: ['Shrek', 'Swag', 'Snipe', 'Soup'],
    T: ['Troll', 'Twitch', 'Tbag', 'Trickshot', 'Thicc'],
    U: ['UwU', 'UMadBro', 'Ultimate', 'Unstoppable'],
    V: ['Vine', 'Vape', 'Viral', 'VroomVroom', 'VictoryRoyale'],
    W: ['WomboCombo', 'Wrecked', 'WTF', 'Weeb', 'WubWub'],
    X: ['XxX', 'Xeno', 'Xtra', 'Xplosive', 'Xray'],
    Y: ['Yeet', 'Yolo', 'Yikes', 'YasQueen', 'Yasss'],
    Z: ['Zoomer', 'Zelda', 'Zinger', 'ZzZ', 'Zany'],
    Å: ['Ånglok', 'ÅÅÅÅÅhhhh'],
    Ä: ['Ärevarv', 'Äckel'],
    Ö: ['Öhm', 'Öbviously']
};

// Custom hook to handle the sign-up logic
export const useSignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Function to get a random word starting with a letter
    const getRandomWord = (letter) => {
        const words = randomWords[letter.toUpperCase()];
        if (words) {
            const randomIndex = Math.floor(Math.random() * words.length);
            return words[randomIndex];
        }
        return ''; // If no words for the letter, return an empty string
    };

    // Handle username input change (with goofy word append)
    const handleChange = (e) => {
        const input = e.target.value;
        const lastChar = input.charAt(input.length - 1).toUpperCase();

        // Only append words if it's a letter, otherwise just update input normally
        if (/[A-Za-z]/.test(lastChar)) {
            const word = getRandomWord(lastChar); // Get the random word for the last character
            if (word) {
                setUsername((prevUsername) => prevUsername + word); // Append word to the username
            } else {
                setUsername(input); // If no word, just update the username
            }
        } else {
            setUsername(input);  // If it's not a letter, don't append a word
        }
    };

    // Handle the form submission and user validation
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting with username:", username, "and password:", password);
        if (!username || !password) {
            setError('All fields are required');
            return;
        }

        // Load existing users from localStorage
        const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');

        // Check if username already exists
        if (storedUsers.some((u) => u.username === username)) {
            setError('Username already exists');
            return;
        }

        // Add new user to localStorage
        const newUser = { username, password };
        const updatedUsers = [...storedUsers, newUser];
        localStorage.setItem('users', JSON.stringify(updatedUsers));

        // Redirect to login
        navigate('/login');
    };

    return {
        username,
        password,
        setPassword, // Expose setPassword to update password from Signup component
        error,
        handleChange,
        handleSubmit,
    };
};