const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const articleRoutes = require('./routes/article');
const userRoutes = require('./routes/users');

const app = express();

app.use(bodyparser.json());

//Permitting cross-site requests to update with cors()
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

//Default backend API message
app.get('/api', (req,res,next) => {
    res.send('Server is running in localhost:8080');
    next();
})

app.use('/api/article', articleRoutes);
app.use('/api/user', userRoutes);

mongoose.connect('mongodb://localhost:27017/blog').then(result => {app.listen(8080);}).catch(err => {console.log(err)});
