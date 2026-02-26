import { useState } from 'react';
import { Autocomplete, Button, Container, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (event, value) => {
    setSearchTerm(value);
    searchItems(value);
  };

  const searchItems = async (query) => {
    if (!query) {
      setSearchResults([]);
      return;
    }

    // Set the search results to just the fixed string
    setSearchResults(["I don't get paid enough for this"]);
  };


  const playError = () => {
    const audio = new Audio("/sounds/error.mp3");
    audio.play();
  };


  const handleSubmit = (event) => {
    event.preventDefault();  // This prevents the form submission and any default behavior
    // Do nothing here, the button click won't trigger anything
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
        <Button onClick={playError} type="submit" color="inherit">
          <SearchIcon style={{ width: "40px", height: "40px" }} />
        </Button>
      </Container>
    </form>
  );
};

export default SearchBar;