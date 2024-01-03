import { v4 as uuidv4 } from 'uuid';
import { Schema, model, Document } from 'mongoose';

interface INote extends Document {
    _id: string;
    title: string;
    description: string;
    createdAt: string;
}

const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };
    return date.toLocaleString('en-US', options);
};

const noteSchema = new Schema({
    _id: { type: String, default: uuidv4 },
    title: { type: String, required: true },
    description: { type: String, required: false },
    createdAt: { type: String }
});

noteSchema.pre<INote>('save', function (next) {
    this.createdAt = formatDate(new Date());
    next();
});

noteSchema.index({ title: 'text', description: 'text' });

const Notes = model<INote>('Notes', noteSchema);

export default Notes;
