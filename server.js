const express = require('express');
const bodyparser = require('body-parser');
const articleRoutes = require('./routes/article');

const app = express();

app.use(bodyparser.json());
app.use('/api/article', articleRoutes);

app.listen(8080);