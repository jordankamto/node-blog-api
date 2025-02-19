const User = require('../models/user');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

//Controller to add a user : /api/auth/signup - CREATE
exports.signupUser = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new Error('Validation failed');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    bcrypt.hash(password, 12).then(hashedPw => {
        //create user with after the hashing is done
        const user = new User({
            name: name,
            email: email,
            password: hashedPw
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
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
};

//Controller to login a user : /api/auth/login
exports.loginUser = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new Error('Validation failed');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const email = req.body.email;
    const password = req.body.password;
    res.json(
        {   message: "login a user is not yet available",
            email: email,
            password: password
        }
    )
}

//Middleware to verify if user is auth for action to be done
exports.isAuth = (req, res, next) => {
    res.send('Middleware to verify is user is authenticated is not yet available');
    next();
}

