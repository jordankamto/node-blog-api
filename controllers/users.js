const User = require('../models/user');

//Controller to add a user : /api/user/add - CREATE
exports.postUser = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    //const profileUrl = '/images/pp1.jpg';
    const user = new User({
        name: name,
        email: email,
        profileUrl: '/images/pp1.jpg'
    });
    //save user to mongodb
    user.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: "User created successfully",
            user: result
        })
    }).catch(err => {
        console.log(err);
    })
};

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

