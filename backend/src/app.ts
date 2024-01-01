import express, { Express } from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import routes from './routes';
import * as dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port: any = process.env.PORT || 3000;
const dbName: string = process.env.DB_NAME || 'notes';
const uri: string = process.env.MONGO_DB_URI  || `mongodb://localhost:27017/${dbName}`;
const options: ConnectOptions = {
  socketTimeoutMS: 1000,
  serverSelectionTimeoutMS: 5000,
};

// MongoDB Connection
mongoose.connect(uri, options);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log(`Connected to MongoDB database: ${dbName}`);
});

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', routes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});