import { BACKEND_URL } from "./variables.js";
import getCookie from "./cookie.js";

function useSubmit({ END_URL, onSuccess, onError, method }) {
    const url = `${BACKEND_URL}/${END_URL}`;

    const handleSubmit = async (JSON_DATA, e) => {
        if (e?.preventDefault) e.preventDefault();
        try {
            const response = await fetch(url, {
                method,
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
        } catch (err) {
            onError?.({ error: err.message });
        }
    };

    return handleSubmit;
}

export default useSubmit;
