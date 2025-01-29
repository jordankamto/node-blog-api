const express = require('express');

const Article = require('../controllers/articles');

const router = express.Router();

router.get('/all', Article.getArticles);

router.post('/post', Article.postArticle);

module.exports = router;