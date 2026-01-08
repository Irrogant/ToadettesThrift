import { BACKEND_URL } from "./variables.js";
import getCookie from "./cookie.js";

function useSubmit({ END_URL, JSON_DATA, onSuccess, onError }) {
    const url = `${BACKEND_URL}/${END_URL}`

    const handleSubmit = async (e) => {
        if (e?.preventDefault) e.preventDefault();

        const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookie("csrftoken"),
        },
        body: JSON.stringify(JSON_DATA),
        });

        const data = await response.json();

        if (response.ok) {
            onSuccess?.(data);
        } else {
            onError?.(data);
        }
    };    

    return handleSubmit;
}

export default useSubmit;