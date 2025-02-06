const User = require('../models/user');

//Contoller to add a user : /api/user/post - CREATE
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
}

//Controller to fetch a user by his user id : /api/user/:id - READ

//Controller to display all users : /api/user/all - READ ALL

//Controller to edit user : /api/user/edit/:id - UPDATE

//Controller to delete user : /api/article/delete/:id - DELETE



//Middleware to verify if user is auth for action to be done

//Middleware to auth user
