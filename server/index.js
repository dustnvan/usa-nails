import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import categoryRoutes from './routes/category.routes.js';

dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));

// Middleware
app.use(express.json());

// Routes
app.use('/api/categories', categoryRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(3000, () => {
      console.log('Server running on http://localhost:3000');
    });
  })
  .catch(console.error);
