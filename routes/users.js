const express = require('express');

const Users = require('../controllers/users');

const router = express.Router();

//GET on /api/user/all
router.get('/all');

//POST on /api/user/post
router.post('/post');

module.exports = router;