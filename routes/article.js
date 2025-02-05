const express = require('express');

const Articles = require('../controllers/articles');

const router = express.Router();

//GET on /api/article/all
router.get('/all', Articles.getArticles);

//POST on /api/article/post
router.post('/post', Articles.postArticle);

module.exports = router;