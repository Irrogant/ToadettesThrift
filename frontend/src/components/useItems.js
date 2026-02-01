import { BACKEND_URL } from "./variables.js";
import { useState, useEffect, useCallback } from "react";

function useItems({ END_URL, run }) {
  const [items, setItems] = useState([]);

  const refetch = useCallback(() => {
    fetch(`${BACKEND_URL}/${END_URL}`, { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch items: ${res.status}`);
        return res.json();
      })
      .then((data) => setItems(data.items ?? []))
      .catch(console.error);
  }, [END_URL]);

  useEffect(() => {
    refetch();
  }, [refetch]);


  return { items, refetch };
}

export default useItems;