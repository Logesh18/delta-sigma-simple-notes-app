import Notes from '../models/note';

export const getNotes = async () => {
    try {
        const result = await Notes.find().sort({ title: 1 });
        console.log('Notes fetched successfully');
        return result ?? [];
    } catch (error) {
        console.error('Error fetching notes:', error);
        return error;
    }
}

export const createNote = async (data: any) => {
    try {
        const newNote = new Notes(data);
        const createdNote = await newNote.save();
        console.log('Note created successfully');
        const result = await getNotes();
        return result;
    } catch (error) {
        console.error('Error creating note:', error);
        return error;
    }
}

export const updateNote = async (_id: string, data: any) => {
    try {
        const updatedData = await Notes.findByIdAndUpdate(_id, data);
        console.log('Note updated successfully');
        const result = await getNotes();
        return result;
    } catch (error) {
        console.error('Error updating note:', error);
        return error;
    }
}

export const deleteNote = async (_id: string) => {
    try {
        const deletedData = await Notes.findByIdAndDelete(_id);
        console.log('Note deleted successfully');
        const result = await Notes.find();
        return result;
    } catch (error) {
        console.error('Error deleting note:', error);
        return error;
    }
}

export const searchNotes = async (searchText: string) => {
    try {
        const result = searchText.length ?
                        await Notes.find({ $text: { $search: searchText } }).sort({ title: 1 }) : 
                        await getNotes();
        console.log('Notes searched successfully');
        return result;
    } catch (error) {
        console.error('Error searching note:', error);
        return error;
    } 
}