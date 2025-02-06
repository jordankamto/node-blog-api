const Article = require('../models/article');

//Controller to display all articles : /api/article/all - READ ALL
exports.getArticles = (req, res, next) => {
    res.status(200).json({
        posts: [{
            title: 'Post #1 title',
            content: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using, making it look like readable English.',
            author: 'supersuperadmin'
        },
        {
            title: 'Post #2 title',
            content: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using, making it look like readable English.',
            author: 'superadmin'
        },
        {
            title: 'Post #3 title',
            content: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using, making it look like readable English.',
            author: 'superadmin'
        },
        {
            title: 'Post #4 title',
            content: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using, making it look like readable English.',
            author: 'superadmin'
        },
        {
            title: 'Post #5 title',
            content: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using, making it look like readable English.',
            author: 'superadmin'
        }]
    })
}

//Contoller to add a article : /api/article/post - CREATE
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
}

//Controller to fetch an article by its id : /api/article/:id - READ

//Controller to edit article : /api/article/edit/:id - UPDATE

//Controller to delete article : /api/article/delete/:id - DELETE



