import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import categoryRoutes from './routes/category.routes.js';
import serviceRoutes from './routes/service.routes.js';

dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));

// Middleware
app.use(express.json());

// Routes
app.use('/api/categories', categoryRoutes);
app.use('/api/services', serviceRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(3000, () => {
      console.log('Server running on http://localhost:3000');
    });
  })
  .catch(console.error);
