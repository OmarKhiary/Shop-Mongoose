const User = require('../models/user');

const getLogin = (req, res, next) => {
    // console.log(req.get('Cookie'));
    // const isLoggedIn = req
    // .get('Cookie')
    // .split(';')[0]
    // .trim()
    // .split('=')[1] === true;
    // console.log(req
    //     .get('Cookie')
    //     .split(';')[0]
    //     .trim()
    //     .split('='));
    console.log(req.session.isLoggedIn);                                                           
    res.render('auth/login',{
        page:'/login',
        pageTitle:'Login',
        isAuthenticated: false
    });
};

const postLogin = (req, res, next) => {
    User.findById('5c728966adee7e81d0bb3919')
    .then(user => {
        req.session.isLoggedIn = true;
        req.session.user = user;
    }).then(() => {
        res.redirect('/')
        console.log(req.session);
        console.log(req.session.user);
        console.log(user);
    })
    .catch(err => console.log(err));
    
}

const postLogOut = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    })
}

module.exports = {getLogin, postLogin, postLogOut};