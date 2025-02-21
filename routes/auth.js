const express = require('express');
const User = require('../models/user');
const router = express.Router();
const {body} = require('express-validator');
const authController = require('../controllers/auth');
const isAuth = require('../middleware/isAuth');

//POST on api/auth/login
router.post('/login', [
    body('email').isEmail().withMessage('Please enter a valid email').normalizeEmail(),
    body('password').trim().isLength({min: 7}).withMessage('Your password should be at least 7 characters long')
], authController.loginUser);

//POST on api/auth/signup
router.post('/signup', [
    body('name').trim().isLength({min: 5}).withMessage('Please enter a user name at least 5 characters long'),
    body('email').isEmail().withMessage('Please enter a valid email').custom((value, {req}) => {
        return User.findOne({email: value}).then(userDoc => {
            if(userDoc){
                return Promise.reject('Email address already exists!');
            }
        });
    }).normalizeEmail(),
    body('password').trim().isLength({min: 7}).withMessage('Your password should be at least 7 characters long')
], authController.signupUser);

//PUT on /api/auth/edit-password/ corresponding to the email of the user
router.put('/edit-password/',isAuth, [
    body('email').isEmail().withMessage('Please enter a valid email').normalizeEmail(),
    body('password').trim().isLength({min: 7}).withMessage('Your password should be at least 7 characters long')
], authController.editPassword);

module.exports = router;
