const express = require('express');
const {body} = require('express-validator');

const Users = require('../controllers/users');
const isAuth = require('../middleware/isAuth');

const router = express.Router();

//GET on /api/user/all
router.get('/all', isAuth, Users.getUsers);

//GET on /api/user/:id
router.get('/:id', isAuth, Users.getUser);

//PUT on /api/user/edit/:id - add body validation
router.put('/edit/:id', isAuth, [
    body('email').isEmail().withMessage('Please enter a valid email').normalizeEmail(),
    body('name').trim().isLength({min: 5}).withMessage('Please enter a valid email').normalizeEmail()], Users.editUser);

//PUT on /api/user/edit-pp/:id
router.put('/edit-pp/:id', isAuth, Users.editPp)

//DELETE on /api/user/delete/:id
router.delete('/delete/:id', isAuth, Users.deleteUser);

module.exports = router;