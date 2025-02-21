const User = require('../models/user');
const jwt = require('jsonwebtoken');
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
            });
        }).catch(err => {
        console.log(err);
    });
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
    let loadedUser;
    User.findOne({email: email}).then(user => {
        if(!user){
            const error = new Error('No user with this email could be found');
            error.statusCode = 404;
            throw error;
        }
        loadedUser = user;
        return bcrypt.compare(password, user.password);
    }).then(isEqual => {
        if(!isEqual){
            const error = new Error('The password you entered is wrong');
            error.statusCode = 401;
            throw error;
        }
        const token =jwt.sign({email: loadedUser.email, userId: loadedUser._id.toString()}, 'tokenSecret', {expiresIn: '5h'});
        res.status(200).json({token: token, userId: loadedUser._id.toString()});
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
}

// Controller to edit user password
exports.editPassword = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new Error('Validation failed');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const email = req.body.email;
    const password = req.body.password;
    bcrypt.hash(password, 12).then(hashedPw => {
        User.findOne({email: email}).then(user => {
            if(!user){
                const error = new Error('No user with the following email was found');
                error.statusCode = 400;
                throw error;
            }
            user.password = hashedPw;
            return user.save();
        }).then(result => {
            res.status(200).json({message: 'Password updated successfully', user: result});
        }).catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
}
