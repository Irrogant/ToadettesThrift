import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Autocomplete, Button, Container, TextField } from '@mui/material';

import { BACKEND_URL } from './variables.js';
import SearchIcon from '@mui/icons-material/Search';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();


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
  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/search/?q=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Container sx={{ display: "flex", alignItems: "center", marginLeft: 4 }}>
        <Autocomplete
          sx={{ width: 600 }}
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
        <Button type="submit" color="inherit">
          <SearchIcon style={{ width: "40px", height: "40px" }} />
        </Button>
      </Container>
    </form>
  );
};

export default SearchBar;