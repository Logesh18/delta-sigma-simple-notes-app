import Notes from '../models/note';

export const getNotes = async () => {
    try {
        const result = await Notes.find().sort({ title: 1 });
        return result ?? [];
    } catch (error) {
        return error;
    }
}

export const createNote = async (data: any) => {
    try {
        const newNote = new Notes(data);
        const createdNote = await newNote.save();
        const result = await getNotes();
        return result;
    } catch (error) {
        return error;
    }
}

export const updateNote = async (_id: string, data: any) => {
    try {
        const updatedData = await Notes.findByIdAndUpdate(_id, data);
        const result = await getNotes();
        return result;
    } catch (error) {
        return error;
    }
}

export const deleteNote = async (_id: string) => {
    try {
        const deletedData = await Notes.findByIdAndDelete(_id);
        const result = await Notes.find();
        return result;
    } catch (error) {
        return error;
    }
}

export const searchNotes = async (searchText: string) => {
    try {
        const result = searchText.length ?
                        await Notes.find({ $text: { $search: searchText } }).sort({ title: 1 }) : 
                        await getNotes();
        return result;
    } catch (error) {
        return error;
    } 
}