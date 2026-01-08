
import { useState, useEffect } from 'react'; 
import { BACKEND_URL } from "./variables.js";
import useSubmit from './useSubmit.js';

export function useCart() {
    const [price, setPrice] = useState(0)
    const [items, setItems] = useState([])
    const [error, setError] = useState(null);

    async function modifyCart(item_id, action){
        const submit = useSubmit({
                END_URL: `cart/`, 
                JSON_DATA: {item_id, action},
                onSuccess: () => {
                },
                onError: (data) => setError(data.error || `Failed to ${action} item`)
        });
        
        await submit()
    }

    async function addToCart(item_id) {
        await modifyCart(item_id, "add")
        setItems(prev => [...prev, item_id]);
    }

    async function removeFromCart(item_id) {
        await modifyCart(item_id, "remove")
        setItems(prev => prev.filter(item => item !== item_id));
    }

    return { addToCart, removeFromCart }
}



