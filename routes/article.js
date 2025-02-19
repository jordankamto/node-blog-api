const express = require('express');
const {body} = require('express-validator');

const Articles = require('../controllers/articles');
const User = require('../models/user');

const router = express.Router();

//GET on /api/article/all
router.get('/all', Articles.getArticles);

//GET on /api/article/:id
router.get('/:id', Articles.getArticle);

//POST on /api/article/add
router.post('/add', [
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
router.put('/edit/:id', [
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
router.post('/delete/:id', Articles.deleteArticle);



module.exports = router;