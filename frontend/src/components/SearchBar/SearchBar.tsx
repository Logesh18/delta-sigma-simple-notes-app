// src/SearchBar.tsx
import React from 'react';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment } from '@mui/material';
import './SearchBar.css';

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        onSearch(query);
    };

    return (
        <TextField
            fullWidth
            variant = "outlined"
            placeholder = "Search..."
            onChange = { handleSearch }
            InputProps = {{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }}
            size = "small"
            className = "searchBar"
        />
    );
};

export default SearchBar;
