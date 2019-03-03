const Product = require('../models/product');

const getAddProduct = (req, res, next)=>{
    res.render('admin/edit-product',{    
            pageTitle:'Add Product',
            path: '/admin/add-product',
            editing: false   ,
            isAuthenticated: req.session.isLoggedIn
        }
    );
};

const postAddProduct = (req, res, next) => {
    const title  = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product({
        title:title,
        price:price,
        description:description,
        imageUrl:imageUrl,
        userId: req.user._id // Or req.user mongoose handle this for u
    });
    product.save()
    .then((results) => {
        console.log('Created Product')
        res.redirect('/');
    }).catch(err => console.log(err));
  
};
const getEditProduct = (req, res, next)=> {
    const editMode = req.query.edit; 
    if(!editMode){
      return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId) 
    .then( product => {
        if(!product) {
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            pageTitle : 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product,
            isAuthenticated:req.session.isLoggedIn
        });
    })
    .catch(err => console.log(err));
};

const postEditProduct = (req, res, next) => {
    // const prodId = req.body.productId;
    // const updatedTitle = req.body.title;
    // const updatedPrice = req.body.price;
    // const updatedImageUrl = req.body.imageUrl;
    // const updatedDesc = req.body.description;
    // Product.findById(prodId)
    // .then(product => {
    //     product.title = updatedTitle;
    //     product.price = updatedPrice;
    //     product.description = updatedDesc;
    //     product.imageUrl = updatedImageUrl;
    //     return product.save();
    // }).then( result => {
    //     console.log('Updated!')
    //     res.redirect('/admin/products');
    // }).catch(err => console.log(err)); 
    const {productId, title, price, imageUrl, description} = req.body;
    Product.findOneAndUpdate({_id:productId}, {
        title,
        imageUrl,
        price,
        description
    }).then( result => {
        console.log('Updated!')
        res.redirect('/admin/products');
    }).catch(err => console.log(err));
}

const getProducts = (req, res, next) => {
    Product.find()
    .then((products) => {
        res.render('admin/products',{
            prods: products,
            pageTitle:'Admin Products',
            path:'/admin/products',
            isAuthenticated: req.session.isLoggedIn
        })
    }).catch(err => console.log(err));
};

const postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findByIdAndRemove(prodId)
        .then( result => {
        console.log('Destroyed!!');
        res.redirect('/admin/products');
    }).catch(err => console.log(err));
}
module.exports = {
    getAddProduct,
    postAddProduct,
    getEditProduct,
    postEditProduct,
    getProducts,
    postDeleteProduct
}