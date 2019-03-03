const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore =require('connect-mongodb-session')(session);

const {get404} = require('./controllers/error');
const User  = require('./models/user');

const MONGODB_URI = 'mongodb+srv://khairy:hEXEJMisDGngU5jT@cluster0-dyyja.mongodb.net/mongoose-shop?retryWrites=true';

const app = express();
const store = new MongoDBStore({
    uri : MONGODB_URI,
    collection: 'sessions'
})

app.set('view engine', 'pug');
app.set('views', 'views');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    session({
        secret: 'my secret',
        resave: false,
        saveUninitialized:false,
        store:store
        })
)
app.use((req,res,next) => {
    if(!req.session.user){
        return next();
    }
    User.findById(req.session.user._id)
    .then(user => {
        // console.log(`${req.user} **********`); // undefined
        // console.log(user);
        req.user = user;
        // console.log('/*****************************************************************/')
        // console.log(`${req.user} **********`)
        next();
  })
    .catch(err => console.log(err));
});

app.use('/admin', adminData.router);
app.use(shopRoutes);
app.use(authRoutes);

app.use(get404);

mongoose.connect(
    'mongodb+srv://khairy:hEXEJMisDGngU5jT@cluster0-dyyja.mongodb.net/mongoose-shop?retryWrites=true',
    { useNewUrlParser: true }
).then(result => {
    User.findOne().then(user => {
        if(!user) {
            const user = new User({
                name: 'Omar',
                email: 'omar@test.com',
                cart: {
                    items: []
                }
            });
            user.save();
        }
    });
    app.listen(3000);
}).catch(
    err => {console.log(err);}
)

