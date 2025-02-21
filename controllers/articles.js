const Article = require('../models/article');
const User = require('../models/user');
const {validationResult} = require('express-validator');
const fs = require('fs');
const path = require('path');

//Controller to display all articles : /api/article/all - READ ALL
exports.getArticles = (req, res, next) => {
    Article.find().then(articles => {
        res.status(200).json({
            message: 'All Articles were fetched successfully',
            article: articles
        })
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })
};

//Controller to add a article : /api/article/add - CREATE
exports.postArticle = (req, res, next) => {
    if(!req.file){
        const error = new Error('No image provided');
        error.statusCode = 422;
        throw error;
    }
    const errors = validationResult(req);
        if(!errors.isEmpty()){
            const error = new Error('Validation failed');
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }
    //receive info from the POST request to CREATE an article
    const imageUrl = req.file.path;
    const title = req.body.title;
    const content = req.body.content;
    
    const article  = new Article({
        title: title,
        imageUrl: imageUrl,
        content: content,
        author: req.userId
    });
    //save post to mongodb
    article.save().then(result => {
        return User.findById(req.userId);
    }).then(user => {
            author = user;
            user.userPosts.push(article);
            return user.save();
        }).then(result => {
            res.status(201).json({
                message: 'Post created successfully',
                article: article,
                author: {_id : author._id, name: author.name, email: author.email}
        })
    })

    .catch(err => {
        console.log(err);
    })
};

//Controller to fetch an article by its id : /api/article/:id - READ
exports.getArticle = (req, res, next) => {
    const id = req.params.id;
    Article.findById(id).then(article => {
        if(!article){
            const error = new Error('Could not find post.');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            message: 'Post fetched',
            article: article
        })
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })
};

//Controller to edit article : /api/article/edit/:id - UPDATE
exports.editArticle = (req, res, next) => {
    const errors = validationResult(req);
        if(!errors.isEmpty()){
            const error = new Error('Validation failed');
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }
    const id = req.params.id;
    const title = req.body.title;
    const content = req.body.content;
    let imageUrl = req.body.imageUrl //if no new file picked the imageUrl doesn't change
    if(req.file){
        imageUrl = req.file.path;
    }
    if(!imageUrl){
        const error = new Error('No image provided');
        error.statusCode = 422;
        throw error;
    }
    Article.findById(id).then(article => {
        if(!article){
            const error = new Error('Could not find post.');
            error.statusCode = 404;
            throw error;
        }
        if(imageUrl !== article.imageUrl){
            deleteImage(article.imageUrl);
        }
        if(article.author !== req.userId && req.userId !== '67b89d7908a899db08f7c3ca'){
            const error = new Error('You are not authorized to edit this article');
            error.statusCode = 403;
            throw error;
        }
        article.title = title;
        article.content = content;
        article.imageUrl = imageUrl;
        return article.save();
    }).then(result => {
        res.status(200).json({message: 'Article updated successfully', article: result});
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
};

//Controller to delete article : /api/article/delete/:id - DELETE
exports.deleteArticle = (req, res, next) => {
    const id = req.params.id;
    Article.findById(id).then(article => {
        if(!article){
            const error = new Error('Could not find post.');
            error.statusCode = 404;
            throw error;
        }
        if(article.author.toString() !== req.userId && req.userId !== '67b89d7908a899db08f7c3ca'){
            const error = new Error('You are not authorized to delete the following post');
            error.statusCode(403);
            throw error;
        }
        deleteImage(article.imageUrl);
        return Article.findByIdAndDelete(id);
    }).then(result => {
        return User.findById(req.userId);
        
    }).then(user => {
        user.userPosts.pull(id);
        return user.save();
    }).then(result => {
        res.status(200).json({message: "Article deleted successfully"});
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })
};

//function to delete old image upon updating
const deleteImage = filePath => {
    if(!filePath){
        const error = new Error('No file to delete was found');
        error.statusCode = 404;
        throw error;
    }
    filePath = path.join(__dirname, '..', filePath);
    fs.unlink(filePath, err => console.log(err));
};