

//Middleware to verify if user is auth for action to be done
exports.isAuth = (req, res, next) => {
    res.send('Middleware to verify is user is authenticated is not yet available');
    next();
}

//Middleware to auth user
exports.authUser = (req, res, next) => {
    res.send('Middleware to authenticate user is not yet available');
    next();
}