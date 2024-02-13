const express = require('express');
const app = express();
const PORT = 3000;

const authenticationMiddleware = require('./auth');

// Routes
app.get('/', (req, res) => {
    res.send('Day11-NodeJS Challenge completed');
});

// Protected route
app.get('/protected', authenticationMiddleware, (req, res) => {
    res.send('You are in the protected area');
});

// Server
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
