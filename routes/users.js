const express = require('express');
const {body} = require('express-validator');

const Users = require('../controllers/users');

const router = express.Router();

//GET on /api/user/all
router.get('/all', Users.getUsers);

//GET on /api/user/:id
router.get('/:id', Users.getUser);

//PUT on /api/user/edit/:id - add body validation
router.put('/edit/:id', [
    body('email').isEmail().withMessage('Please enter a valid email').normalizeEmail(),
    body('password').trim().isLength({min: 7}).withMessage('Your password should be at least 7 characters long')
],Users.editUser);

//POST on /api/user/delete/:id
router.post('/delete/:id', Users.deleteUser);

module.exports = router;