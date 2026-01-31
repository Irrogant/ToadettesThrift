import { BACKEND_URL } from "./variables.js";
import getCookie from "./cookie.js";

function useSubmitFormData({
    END_URL,
    getFormData,
    onSuccess,
    onError,
    method,
}) {
    const url = `${BACKEND_URL}/${END_URL}`;

    const handleSubmit = async (e) => {
        if (e?.preventDefault) e.preventDefault();

        let formData;
        try {
            formData = getFormData();
        } catch (err) {
            onError?.({ error: "Failed to build form data" });
            return;
        }

        try {
            const response = await fetch(url, {
                method,
                credentials: "include",
                headers: {
                    "X-CSRFToken": getCookie("csrftoken"),
                },
                body: formData,
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

export default useSubmitFormData;