import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';
import path from 'path';
dotenv.config();

const PORT = process.env.PORT || 5000;

// Serve static files from the React app
// Serve static files from the React app
if (process.env.NODE_ENV === 'development') {
    // Serve the build folder created by Vite or React's build process
    app.use(express.static(path.join(__dirname, '..', '/frontend1/dist')));

    // Handle all requests and serve the frontend's index.html
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '..', 'frontend1', 'dist', 'index.html'));
    });
}

mongoose.connect(process.env.MONGO_URI as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT,'0.0.0.0', () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
})
.catch(err => {
    console.error('MongoDB connection error:', err);
});
