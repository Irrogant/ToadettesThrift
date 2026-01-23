
import { useState, useEffect, useMemo } from 'react';
import useSubmit from './useSubmit.js';
import useItems from './useItems.js';
import { useAuth } from "./AuthContext";

export function useCart() {
    const [price, setPrice] = useState(0)
    const [error, setError] = useState(null);
    const { items, refetch } = useItems({ END_URL: "cart/" });

    const { isLoggedIn } = useAuth()
    // kan man int fetch itemid direkt från cartid?

    // TODO:::::::::: items funkar int, kolla console log

    const itemIDs = useMemo(() => {
        if (!items) return [];
        const awooga = items.map(item => item.id);
        return awooga;
    }, [items]);

    const submit = useSubmit({
        END_URL: "cart/",
        onSuccess: () => { refetch() },
        onError: (data) => setError(data?.error || "Failed to modify cart"),
    });

    useEffect(() => {
        // console.log("ITEMIDSSSSSSSHHSHSHSHS", itemIDs)
        // console.log("normal items", items)
    }, [items]);

    async function modifyCart(item_id, action) {
        if (!isLoggedIn) {
            console.log("narrrr");
            return;
        }
        await submit({ item_id, action });
    }

    async function addToCart(item_id) {
        await modifyCart(item_id, "add")
    }

    async function removeFromCart(item_id) {
        await modifyCart(item_id, "remove")
    }

    function inCart(item_id) {
        if (!isLoggedIn) {
            console.log("narrrr");
            return false;
        }

        return itemIDs.includes(item_id);
    }

    return { addToCart, removeFromCart, inCart, items }
}



