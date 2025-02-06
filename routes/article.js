const express = require('express');

const Articles = require('../controllers/articles');

const router = express.Router();

//GET on /api/article/all
router.get('/all', Articles.getArticles);

//GET on /api/article/:id
router.get('/:id', Articles.getArticle);

//POST on /api/article/add
router.post('/add', Articles.postArticle);

//POST on /api/article/edit/:id
router.post('/edit/:id', Articles.editArticle);

//POST on /api/article/delete/:id
router.post('/delete/:id', Articles.deleteArticle);



module.exports = router;