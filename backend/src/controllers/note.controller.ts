import { Request, Response } from 'express';
import * as NoteRepo from '../repositories/note.repository'

export const getNotes = async (req: Request, res: Response) => {
    try {
        const notes = await NoteRepo.getNotes();
        res.status(200).json(notes);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

export const createNote = async (req: Request, res: Response) => {
    try {
        const newNoteData = {
            title: req.body.title,
            description: req.body.description,
        };
        const notes = await NoteRepo.createNote(newNoteData);
        res.status(200).json(notes);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

export const updateNote = async (req: Request, res: Response) => {
    try {
        console.log(req.params, req.body);
        const noteId = req.params.id;
        const updateNote = req.body;
        const notes = await NoteRepo.updateNote(noteId, updateNote);
        res.status(200).json(notes);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

export const deleteNote = async (req: Request, res: Response) => {
    try {
        const noteId = req.params.id;
        const notes = await NoteRepo.deleteNote(noteId);
        res.status(200).json(notes);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

export const searchNotes = async (req: Request, res: Response) => {
    try {
        const searchText: string = req.query.q as string;
        const notes = await NoteRepo.searchNotes(searchText);
        res.status(200).json(notes);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};