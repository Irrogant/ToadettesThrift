
import { useState, useEffect, useMemo } from 'react'; 
import { BACKEND_URL } from "./variables.js";
import useSubmit from './useSubmit.js';
import useItems from './useItems.js';

export function useCart() {
    const [price, setPrice] = useState(0)
    const [error, setError] = useState(null);
    const items = useItems({ END_URL: "cart/" });
    const itemIDs = useMemo(() => items.map(item => item.id), [items]);
    // const [selectedItemId, setSelectedItemId] = useState("")
    // const [selectedAction, setSelectedAction] = useState("") 

    const submit = useSubmit({
        END_URL: "cart/",
        onSuccess: (data) => {
            console.log("Cart updated", data);
        },
        onError: (data) => setError(data?.error || "Failed to modify cart"),
    });

    async function modifyCart(item_id, action) {
        await submit({ item_id, action });
    }

    async function addToCart(item_id) {
        await modifyCart(item_id, "add")
    }

    async function removeFromCart(item_id) {
        await modifyCart(item_id, "remove")
    }

    function inCart(item_id) {
        return itemIDs.includes(item_id)
    }

    return { addToCart, removeFromCart, inCart, items }
}



