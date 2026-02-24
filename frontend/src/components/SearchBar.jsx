import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Autocomplete, Button, Container, TextField } from '@mui/material';

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
    if (!query) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await fetch("/items.json");
      if (!response.ok) throw new Error("Failed to fetch items");

      const data = await response.json();

      const filteredTitles = data.items
        .filter((item) =>
          item.title.toLowerCase().includes(query.toLowerCase())
        )
        .map((item) => item.title);

      setSearchResults(filteredTitles);
    } catch (error) {
      console.error(error);
    }
  };

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
          renderOption={(props, option) => (
            <li
              {...props}
              style={{ color: 'rgb(240, 88, 176)', background: '#fafafa' }}
            >
              {option}
            </li>
          )}
          renderInput={(params) => (
            <TextField {...params} label="Search" variant="outlined" fullWidth />
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