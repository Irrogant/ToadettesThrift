import React, {useState} from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useAuth } from "./AuthContext";

function Account() {
  const { username, email } = useAuth();
  /* TODO: edit password */
  /*TODO: update information without having to refresh, useEffect*/

  return (
    <Box sx={{ mt: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
      <Typography variant="h5">Hello, {username}</Typography>

        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Account Details</Typography>
          <Typography>Username: {username}</Typography>
          <Typography>Email: {email}</Typography>
        </Box>

        <Button> Edit </Button>

    </Box>
  );
}

export default Account;
