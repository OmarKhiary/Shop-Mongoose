const express = require('express');

const {getLogin,postLogin,postLogOut,postSignup,getSignup} = require('../controllers/auth');

const router = express.Router();

router.get('/login', getLogin);

router.get('/signup', getSignup);

router.post('/login', postLogin);

router.post('/signup', postSignup);

router.post('/logout', postLogOut);

module.exports = router;