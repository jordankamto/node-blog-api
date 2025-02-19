const express = require('express');
const {body} = require('express-validator');
const isAuth = require('../middleware/isAuth');

const Articles = require('../controllers/articles');
const User = require('../models/user');

const router = express.Router();

//GET on /api/article/all
router.get('/all', isAuth, Articles.getArticles);

//GET on /api/article/:id
router.get('/:id', isAuth, Articles.getArticle);

//POST on /api/article/add
router.post('/add', isAuth, [
    body('title').trim().isLength({min: 5}).withMessage('Your post title should be at least 5 characters long'),
    body('content').trim().isLength({min: 7}).withMessage('Your post title should be at least 7 characters long'),
    body('author').trim().custom((value, {req}) => {
        return User.findById(value).then(result => {
            if(!result){
                return Promise.reject('The author was not found in our database!');
            }
        });
    })
],Articles.postArticle);

//PUT on /api/article/edit/:id
router.put('/edit/:id', isAuth, [
    body('title').trim().isLength({min: 5}).withMessage('Your post title should be at least 5 characters long'),
    body('content').trim().isLength({min: 7}).withMessage('Your post title should be at least 7 characters long'),
    body('author').trim().custom((value, {req}) => {
        return User.findById(value).then(result => {
            if(!result){
                return Promise.reject('The author was not found in our database!');
            }
        });
    })
],Articles.editArticle);

//POST on /api/article/delete/:id
router.post('/delete/:id', isAuth, Articles.deleteArticle);



module.exports = router;