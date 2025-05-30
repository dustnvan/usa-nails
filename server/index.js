const express = require('express');
const app = express();
app.listen(5000, () => console.log('Server is running'));
require('dotenv').config();

const mongoose = require('mongoose');
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });
