import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useContext } from 'react';
import { NotesContext } from '../../App';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NoteForm from '../NoteForm/NoteForm';
import { NotesData } from '../../interfaces';
import "./Note.css"
import { CardHeader } from '@mui/material';

const Note: React.FC<NotesData> = ({ _id, title, description, createdAt }) => {
    const notesContext = useContext(NotesContext);
    const backend_url: string = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000';

    const handleEdit = async () => {
        notesContext?.setCurrentData({
            _id,
            isEdit: true,
            initialTitle: title,
            initialDescription: description
        });
        notesContext?.setFormOpen(true);
    };

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`${backend_url}/deleteNote/${_id}`);
            notesContext?.setNotes(response.data);
            toast.success('Note deleted successfully', process.env.REACT_APP_TOAST_TIME);
        } catch (error) {
            notesContext?.setNotes(notesContext?.notes);
            toast.error('Failed to delete note', process.env.REACT_APP_TOAST_TIME);
        }
    };

    return (
        <>
            <Card className="CardContainer">
                <CardHeader
                    action={
                        <>
                            <IconButton aria-label="edit" onClick={handleEdit}>
                                <EditIcon />
                            </IconButton>
                            <IconButton aria-label="delete" onClick={handleDelete}>
                                <DeleteIcon />
                            </IconButton>
                        </>
                    }
                    title = {title} 
                    subheader = {createdAt}
                />
                <CardContent>
                    <Typography className="Description TextOverflow" paragraph color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>
            </Card>
            <NoteForm _id={_id} initialTitle={title} initialDescription={description} isEdit={true}/>
        </>
    );
};

export default Note;
