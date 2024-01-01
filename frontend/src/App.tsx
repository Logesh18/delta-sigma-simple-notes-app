import React, { useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import NoteForm from './components/NoteForm/NoteForm';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log('Search query:', query);
  };

  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleAddClick = () => {
    setDialogOpen(true);
  };

  const [isFormOpen, setFormOpen] = useState(false);

  const handleFormOpen = () => {
    setFormOpen(true);
  };

  const handleFormClose = () => {
    setFormOpen(false);
  };

  const handleFormSubmit = async (title: string, description: string) => {
    try {
      // Simulate an API call delay (replace with actual API call)
      const responseMessage = await new Promise<string>((resolve) => {
        setTimeout(() => {
          // Assume the API call was successful, and the response message is "Note submitted successfully!"
          resolve('Note submitted successfully!');
        }, 2000);
      });

      // Display success message using toast
      toast.success(responseMessage);

      return responseMessage;
    } catch (error) {
      // Display error message using toast
      toast.error('Error submitting note. Please try again.');
      throw error;
    }
  };


  return (
    <div className="appContainer">
      <div className = "headerContainer">
        <div className = "title">Notes App</div>
        <div className = "searchBar">
          <SearchBar onSearch={ handleSearch } />
        </div>
        <AddCircleOutlineIcon className = "addNotesIcon" onClick={handleFormOpen} />
      </div>
      <NoteForm isOpen={isFormOpen} onClose={handleFormClose} onSubmit={handleFormSubmit} />
      <ToastContainer />
    </div>
  );
};

export default App;
