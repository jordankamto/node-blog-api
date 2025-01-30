const express = require('express');

const Article = require('../controllers/articles');

const router = express.Router();

//GET on /api/article/all
router.get('/all', Article.getArticles);

//POST on /api/article/post
router.post('/post', Article.postArticle);

module.exports = router;