const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const articleRoutes = require('./routes/article');
const userRoutes = require('./routes/users');

const app = express();

app.use(bodyparser.json());
//access the server.js directory path then to the images folder found in the same dir to access ./images and serve them statically
app.use('/images', express.static(path.join(__dirname, 'images')));

//Middleware to permit cross-site requests to update with cors()
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})


//Default backend API message
app.get('/api', (req, res, next) => {
    res.send('API is Currently active');
    next();
})

app.use('/api/article', articleRoutes);
app.use('/api/user', userRoutes);

//advanced error handling
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({message : message});
})

//404 page handling
app.use((req,res,next) => {
    res.status(404).send('Ressource unavailable');
    next();
})

mongoose.connect('mongodb://localhost:27017/blog').then(result => {app.listen(8080);}).catch(err => {console.log(err)});
