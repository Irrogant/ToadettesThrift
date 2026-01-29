import React, { useState } from "react";
import { Autocomplete, TextField, Button, Container } from "@mui/material";
import mag from "../assets/icons/mag.png";
import { BACKEND_URL } from "./variables.js";
import { Link } from "react-router-dom";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (event, value) => {
    setSearchTerm(value);
    searchItems(value);
  };

  const searchItems = async (query) => {
    const url = `${BACKEND_URL}/searchitems/?q=${encodeURIComponent(query)}`;

    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();

    /* return array of the titles */
    const titles = data.items.map(item => item.title);
    setSearchResults(titles);

  }

  return (
    <Container sx={{ display: "flex", alignItems: "center", marginLeft: 4 }}>
      <Autocomplete
        sx={{ width: 600, alignContent: "center" }}
        freeSolo
        options={searchResults}
        value={searchTerm}
        onInputChange={handleSearch}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Button color="inherit" component={Link} to={`/search/?q=${encodeURIComponent(searchTerm)}`}>
        <img src={mag} alt="Search" style={{ width: "40px", height: "40px" }} />
      </Button>
    </Container>
  );
};

export default SearchBar;