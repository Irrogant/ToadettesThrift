import { BACKEND_URL } from "./variables.js";
import React, { useState, useEffect} from "react";

function useItems({END_URL}) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch((`${BACKEND_URL}/${END_URL}`), {
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => setItems(data.items))
      .catch((error) => console.error('Error fetching items:', error));
  }, []); 
  console.log("items found!!!")
  console.log(items)
  return items;
}




export default useItems;