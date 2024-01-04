import React, { useContext } from 'react';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment } from '@mui/material';
import { SearchBarProps } from '../../interfaces';
import axios from 'axios';
import { toast } from 'react-toastify';import 'react-toastify/dist/ReactToastify.css';
import { NotesContext } from '../../App';

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, searchQuery }) => {
    const backend_url: string = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000';
    const notesContext = useContext(NotesContext);
    const handleSearch = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        try {
            if(event?.key === 'Enter') {
                const response = await axios.get(`${backend_url}/searchNotes?q=${searchQuery}`);
                notesContext?.setNotes(response.data);
                toast.success('Notes are filtered', process.env.REACT_APP_TOAST_TIME);
            }
        } catch (error) {
            notesContext?.setNotes(notesContext?.notes);
            toast.error('Failed to filter notes', process.env.REACT_APP_TOAST_TIME);
        }
    };

    return (
        <TextField
            fullWidth
            variant="outlined"
            placeholder="Search..."
            onChange={(event) => onSearch(event.target.value)}
            onKeyDown={handleSearch}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }}
            size="small"
            className="searchBar"
        />
    );
};

export default SearchBar;
