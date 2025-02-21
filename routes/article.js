const express = require('express');
const {body} = require('express-validator');
const isAuth = require('../middleware/isAuth');

const Articles = require('../controllers/articles');

const router = express.Router();

//GET on /api/article/all
router.get('/all', Articles.getArticles);

//GET on /api/article/:id
router.get('/:id', Articles.getArticle);

//POST on /api/article/add
router.post('/add', isAuth, [
    body('title').trim().isLength({min: 5}).withMessage('Your post title should be at least 5 characters long'),
    body('content').trim().isLength({min: 7}).withMessage('Your post title should be at least 7 characters long')
], Articles.postArticle);

//PUT on /api/article/edit/:id
router.put('/edit/:id', isAuth, [
    body('title').trim().isLength({min: 5}).withMessage('Your post title should be at least 5 characters long'),
    body('content').trim().isLength({min: 7}).withMessage('Your post title should be at least 7 characters long')
], Articles.editArticle);

//DELETE on /api/article/delete/:id
router.delete('/delete/:id', isAuth, Articles.deleteArticle);



module.exports = router;