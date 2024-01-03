import React, { useCallback, useEffect, useState, createContext } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import NoteForm from './components/NoteForm/NoteForm';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import './App.css';
import Note from './components/Note/Note';

interface NotesData {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
}

interface NotesContextProps {
  notes: NotesData[];
  setNotes: React.Dispatch<React.SetStateAction<NotesData[]>>;
  isFormOpen: boolean;
  handleFormClose: any,
  handleFormSubmit: any,
  setFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NotesContext = createContext<NotesContextProps | undefined>(undefined);
const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [notes, setNotes] = useState<NotesData[]>([]);
  const backend_url: string = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000';
  
  
  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`${backend_url}/getNotes`);
      setNotes(response.data);
    } catch (error) {
      setNotes([]);
    }
  },[backend_url]);
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log('Search query:', query);
  };

  const [isFormOpen, setFormOpen] = useState(false);

  const handleFormOpen = () => {
    setFormOpen(true);
  };

  const handleFormClose = () => {
    setFormOpen(false);
  };

  const notesContextValue: any = {
    notes,
    setNotes,
    isFormOpen,
    handleFormClose,
    setFormOpen
  }

  return (
    <NotesContext.Provider value = { notesContextValue }>
      <div className="appContainer">
        <div className = "headerContainer">
          <div className = "title">Notes App</div>
          <div className = "searchBar">
            <SearchBar onSearch={ handleSearch } />
          </div>
          <AddCircleOutlineIcon className = "addNotesIcon" onClick={handleFormOpen} />
        </div>
        <div>
            {
              notes.length ? 
                notes.map((note: any) => {
                  return <Note key = {note._id} { ...note }/>
                }) 
              : <div className= "">No notes present</div>
            }
        </div>
        {isFormOpen && <NoteForm/>}
        <ToastContainer />
      </div>
    </NotesContext.Provider>
    
  );
};

export default App;
