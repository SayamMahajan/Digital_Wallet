import express from 'express';
import connectMongo from './config/db.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import 'dotenv/config';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // The origin of your frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS' ,'PATCH'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization', 'withCredentials'], // Explicitly allow withCredentials header
  credentials: true, // Allow cookies and credentials
}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
connectMongo(process.env.MONGO_URL);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));