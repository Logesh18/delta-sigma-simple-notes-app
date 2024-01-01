import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface MyCardProps {
    _id: string;
    title: string;
    description: string;
    createdAt: string;
}

const Note: React.FC<MyCardProps> = ({ _id, title, description, createdAt }) => {
    const handleEdit = () => {
        console.log(`Editing: ${title}`);
    };

    const handleDelete = () => {
        console.log(`Deleting: ${title}`);
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="div">
                    { title }
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    { description }
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Created At: {createdAt}
                </Typography>
            </CardContent>
            <CardActions>
                <IconButton aria-label="edit" onClick={ handleEdit }>
                    <EditIcon />
                </IconButton>
                <IconButton aria-label="delete" onClick={ handleDelete }>
                    <DeleteIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default Note;
