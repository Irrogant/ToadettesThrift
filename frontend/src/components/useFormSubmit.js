function useFormSubmitLocal({ getFormData, onSuccess, onError }) {
    const handleSubmit = (e) => {
        if (e?.preventDefault) e.preventDefault();

        let formData;
        try {
            formData = getFormData();
        } catch (err) {
            onError?.({ error: "Failed to build form data" });
            return;
        }

        try {
            // Load existing items from localStorage
            const storedItems = JSON.parse(localStorage.getItem("items") || "[]");

            // Assign a new id
            const newId = storedItems.length > 0 ? storedItems[storedItems.length - 1].id + 1 : 1;

            const newItem = { id: newId, ...formData };

            // Save back
            localStorage.setItem("items", JSON.stringify([...storedItems, newItem]));

            onSuccess?.(newItem);
        } catch (err) {
            onError?.({ error: err.message });
        }
    };

    return handleSubmit;
}

export default useFormSubmitLocal;