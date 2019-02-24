const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const {get404} = require('./controllers/error');
//const User  = require('./models/user');

const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static(path.join(__dirname, 'public')));

//app.use((req,res,next) => {
//     User.findById('5c6890b61c9d440000177c9e')
//     .then(user => {
//         console.log(`${req.user} **********`); // undefined
//         console.log(user);
//         req.user = new User(user.name, user.email, user.cart, user._id);
//         console.log('/*****************************************************************/')
//         console.log(`${req.user} **********`)
//         next();
//   });
//     .catch(err => console.log(err));
// });

app.use('/admin', adminData.router);
app.use(shopRoutes);

app.use(get404);

mongoose.connect(
    'mongodb+srv://khairy:hEXEJMisDGngU5jT@cluster0-dyyja.mongodb.net/mongoose-shop?retryWrites=true',
    { useNewUrlParser: true }
).then(result => {
    app.listen(3000);
}).catch(
    err => {console.log(err);}
)

