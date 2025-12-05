import { BACKEND_URL } from "./variables.js";
import React, { useState, useEffect} from "react";

function useItems() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch((`${BACKEND_URL}/myitems/`), {
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => setItems(data.items))
      .catch((error) => console.error('Error fetching items:', error));
  }, []); 

  return items;
}




export default useItems;