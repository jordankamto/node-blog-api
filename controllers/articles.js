const Article = require('../models/article');

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

//Contoller to add a article : /api/article/add - CREATE
exports.postArticle = (req, res, next) => {
    //receive info from the POST request to CREATE an article
    const title = req.body.title;
    const content = req.body.content;
    const author = req.body.author;
    const article  = new Article({
        title: title,
        imageUrl: './images/im1.jpg',
        content: content,
        author: author
    });
    //save post to mondodb
    article.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Post created successfully',
            article: result
        })
    }).catch(err => {
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
    res.send('edit an article is not yet available');
};

//Controller to delete article : /api/article/delete/:id - DELETE
exports.deleteArticle = (req, res, next) => {
    res.send('delete an article is not yet available');
};



