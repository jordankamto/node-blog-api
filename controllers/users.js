const User = require('../models/user');
const { body, validationResult } = require('express-validator');


//Controller to fetch a user by his user id : /api/user/:id - READ
exports.getUser = (req, res, next) => {
    res.send('fetch a user by his user id is not yet available')
};

//Controller to display all users : /api/user/all - READ ALL
exports.getUsers = (req, res, next) => {
    res.send('fetch all users is not yet available')
};

//Controller to edit user : /api/user/edit/:id - UPDATE
exports.editUser = (req, res, next) => {
    res.send('Edit user is not yet available')
};

//Controller to delete user : /api/article/delete/:id - DELETE
exports.deleteUser = (req, res, next) => {
    res.send('Deleting a user is not yet available')
};

