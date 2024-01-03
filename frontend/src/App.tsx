import React, { useCallback, useEffect, useState, createContext } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import NoteForm from './components/NoteForm/NoteForm';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import './App.css';
import Note from './components/Note/Note';
import { FormProps, NotesContextProps, NotesData } from './interfaces';

export const NotesContext = createContext<NotesContextProps | undefined>(undefined);
const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [notes, setNotes] = useState<NotesData[]>([]);
  const backend_url: string = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000';
  const defaultFormValue: FormProps = {
    _id: '',
    isEdit: false,
    initialTitle: '',
    initialDescription: ''
  };
  const [currentData, setCurrentData] = useState<FormProps>(defaultFormValue);
  
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
  };

  const [isFormOpen, setFormOpen] = useState(false);

  const handleFormOpen = () => {
    setCurrentData(defaultFormValue);
    setFormOpen(true);
  };

  const handleFormClose = () => {
    setFormOpen(false);
  };

  const notesContextValue: any = {
    notes,
    currentData,
    isFormOpen,
    setNotes,
    handleFormClose,
    setFormOpen,
    setCurrentData
  }

  return (
    <NotesContext.Provider value = { notesContextValue }>
      <>
        <div className = "headerContainer">
          <div className = "title">Notes App</div>
          <div className = "searchBar">
            <SearchBar onSearch={ handleSearch } searchQuery={searchQuery}/>
          </div>
          <AddCircleOutlineIcon className="AddIcon" onClick={handleFormOpen} />
        </div>
        <div className="NotesContainer">
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
      </>
    </NotesContext.Provider>
    
  );
};

export default App;
