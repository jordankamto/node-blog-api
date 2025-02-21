const User = require('../models/user');
const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
const { findByIdAndDelete } = require('../models/article');


//Controller to fetch a user by his user id : /api/user/:id - READ
exports.getUser = (req, res, next) => {
    const id = req.params.id;
    User.findById(id).then(user => {
        res.status(200).json({message: 'User info fetched successfully', user: user});
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
};

//Controller to display all users : /api/user/all - READ ALL
exports.getUsers = (req, res, next) => {
    User.find().then(users => {
        res.status(200).json({message: 'All users info fetched successfully', user: users});
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })
};

//Controller to edit user : /api/user/edit/:id - UPDATE
exports.editUser = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new Error('Validation failed');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const name = req.body.name;
    const email = req.body.email;
    const id = req.params.id;
    
    User.findById(id).then(user => {
        if(!user){
            const error = new Error('User was not found');
            error.statusCode = 404;
            throw error;
        }
        //prevent another user from changing other users information
        if(user._id.toString() !== req.userId){
            const error = new Error('You are not authorized to modify this users information');
            error.statusCode = 401;
            throw error;
        }
        user.name = name;
        user.email = email;

        return user.save();
    }).then(result => {
        res.status(200).json({message: 'User updated successfully', user: result});
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })
};

//Controller to delete user : /api/user/delete/:id - DELETE
exports.deleteUser = (req, res, next) => {
    const id = req.params.id;

    User.findById(id).then(user => {
        if(!user){
            const error = new Error('User was not found');
            error.statusCode = 404;
            throw error;
        }
        //prevent another user from changing other users information
        if(user._id.toString() !== req.userId){
            const error = new Error('You are not authorized to modify this users information');
            error.statusCode = 401;
            throw error;
        }
        deleteImage(user.profileUrl);
        return User.findByIdAndDelete(id);
    }).then(result => {
        res.status(200).json({message: 'User deleted successfully', user: result});
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
};

//Controller to edit user's profile picture : /api/user/edit-pp/:id
exports.editPp = (req, res, next) => {
    const id = req.params.id;
    let profileUrl = req.body.profileUrl;
    if(req.file){
        profileUrl = req.file.path;
    }
    if(!profileUrl){
        const error = new Error('No image provided');
        error.statusCode = 422;
        throw error;
    }
    User.findById(id).then(user => {
        if(!user){
            const error = new Error('User was not found');
            error.statusCode = 404;
            throw error;
        }
        //prevent another user from changing other users information
        if(user._id.toString() !== req.userId){
            const error = new Error('You are not authorized to modify this users information');
            error.statusCode = 401;
            throw error;
        }
        if(profileUrl !== user.profileUrl){
            deleteImage(user.profileUrl);
        }
        user.profileUrl = profileUrl;
        return user.save();
    }).then(result => {
        res.status(200).json({message: 'User profile Url updated successfully', user: result});
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })
};

//function to delete old image upon updating
const deleteImage = filePath => {
    filePath = path.join(__dirname, '..', filePath);
    fs.unlink(filePath, err => console.log(err));
};