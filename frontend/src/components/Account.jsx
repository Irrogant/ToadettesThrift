import React, {useState} from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useAuth } from "./AuthContext";
import useItems from "./useItems";

function Account() {
  const { username, email } = useAuth();
  const [view, setView] = useState(null);
  const items = useItems(); 

  return (
    <Box sx={{ mt: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
      <Typography variant="h5">Hello, {username}</Typography>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Button type="button" variant="contained" onClick={() => setView("details")}>
          Account Details
        </Button>
        <Button type="button" variant="contained" onClick={() => setView("items")}>
          Items
        </Button>
      </Box>

      {view === "details" && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Account Details</Typography>
          <Typography>Username: {username}</Typography>
          <Typography>Email: {email}</Typography>
        </Box>
      )}

      {view === "items" && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Your Items</Typography>
          {items.length === 0 ? (
            <Typography>No items LMAOOOOOOO</Typography>
          ) : (
            items.map((item, index) => (
              <Box key={index} sx={{ border: '1px solid #ccc', p: 2, mb: 1 }}>
                <Typography variant="subtitle1">{item.title}</Typography>
                <Typography variant="body2">{item.description}</Typography>
                <Typography variant="body2">Price: ${item.price}</Typography>
                <Typography variant="body2">Amount: {item.amount}</Typography>
                <Typography variant="body2">Date: {item.date_added}</Typography>
                <Typography variant="body2">Status: {item.status}</Typography>
              </Box>
            ))
          )}
        </Box>
      )}
    </Box>
  );
}

export default Account;
