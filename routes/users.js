const express = require('express');

const Users = require('../controllers/users');

const router = express.Router();

//GET on /api/user/all
router.get('/all', Users.getUsers);

//GET on /api/user/:id
router.get('/:id', Users.getUser);

//POST on /api/user/add
router.post('/add', Users.postUser);

//POST on /api/user/edit/:id
router.post('/edit/:id', Users.editUser);

//POST on /api/user/delete/:id
router.post('/delete/:id', Users.deleteUser);

module.exports = router;