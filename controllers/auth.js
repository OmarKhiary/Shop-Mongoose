const bcrypt = require('bcryptjs');

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
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email: email})
    .then(user => {
        if(!user) {
            return res.redirect('/login');
        }
        bcrypt.compare(password, user.password)
        .then(doMatch => {
            if(doMatch){
                req.session.isLoggedIn = true;
                req.session.user = user;
                return req.session.save(err =>{
                    console.log(err)
                    res.redirect('/');
                });
            }
            res.redirect('/login');
        }).catch( err => {
            console.log(err);
            res.redirect('/login');
        });
    }).catch(err => console.log(err));       
};

const getSignup = (req, res, next) => {
    res.render('auth/signup', {
        path:'/signup',
        pageTitle:'signup',
        isAuthenticated: false
    })
};

const postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    User.findOne({email : email})
    .then((userDoc) => {
        if(userDoc){
            return res.redirect('/signup')
        }
        // @returns promise
        return bcrypt.hash(password, 12)
            .then(hashedPassword => {
                const user = new User({
                    email : email,
                    password: hashedPassword,
                    cart: {items: []}
            })
            return user.save();
        }).then(result => {
            res.redirect('/login');
        });
    }).catch(err => {
        console.log(err);
    });
}

const postLogOut = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    })
}

module.exports = {getLogin, postLogin, postLogOut,getSignup,postSignup};