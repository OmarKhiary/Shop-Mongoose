const express = require('express');

const {getLogin,postLogin,postLogOut} = require('../controllers/auth');

const router = express.Router();

router.get('/login', getLogin);

router.post('/login', postLogin);

router.post('/logout', postLogOut);

module.exports = router;