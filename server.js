const express = require('express');
const bodyparser = require('body-parser');
const articleRoutes = require('./routes/article');

const app = express();

app.use(bodyparser.json());

//Permitting cross-site requests to update with cors()
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use('/api/article', articleRoutes);

app.listen(8080);