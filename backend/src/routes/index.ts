import express, { Router } from 'express';
import * as noteController from '../controllers/note.controller';

const router: Router = express.Router();

// Routes
router.get('/getNotes', noteController.getNotes);
router.post('/createNote', noteController.createNote);
router.put('/updateNote/:id', noteController.updateNote);
router.delete('/deleteNote/:id', noteController.deleteNote);
router.get('/searchNotes', noteController.searchNotes);

export default router;
