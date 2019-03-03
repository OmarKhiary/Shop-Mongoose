const Product = require('../models/product');
const Order = require('../models/order');

const getProducts = (req, res, next) => {
    Product.find()
    .then((products) => {
        console.log(products)
        res.render('shop/product-list',{
            prods:products,
            pageTitle:'All Products',
            path:'/products',
            isAuthenticated: req.session.isLoggedIn
        });
    })
    .catch(err => console.log(err)); 
};

const getProduct = (req,res, next) => {
    const prodId = req.params.productId;
    // Product.findAll({where: {id: prodId} })
    // .then( products => {
    //     res.render('shop/product-detail', {
    //         product:products[0], 
    //         pageTitle:products[0].title, // for which title would be active
    //         path:'/products' // For Which class would be active 
    //     });   
    // }).catch(err => console.log(err));
    Product.findById(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products',
        isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch(err => console.log(err));
};

const getIndex = (req, res, next) => {
    Product.find()
    .then((products) => {
        res.render('shop/index',{
            prods:products,
            pageTitle:'shop',
            path:'/',
            isAuthenticated: req.session.isLoggedIn
        });
    })
    .catch(err => console.log(err)); 
};

const getCart = (req, res,  next) => {
    req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
        const products = user.cart.items;
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products,
        isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch(err => console.log(err));
    // Cart.getCart(cart => {
    //     Product.fetchAll(products => {
    //         const cartProducts = [];
    //         for (product of products){
    //             const cartProductData = cart.products.find(
    //                 prod => prod.id === product.id
    //             );
    //             if (cartProductData){
    //                 cartProducts.push({productData: product, qty: cartProductData.qty})
    //             }
    //         };
    //         res.render('shop/cart',{
    //             path: 'cart',
    //             pageTitle: 'Your Cart',
    //             products:cartProducts
    //         });
    //     });
    // });
};

const postCart = (req,res, next) => { 
    const prodId = req.body.productId;
    Product.findById(prodId).then(product => { 
        return req.user.addToCart(product);
    });
    res.redirect('/cart');
}
;
const postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    req.user
      .removeFromCart(prodId)
      .then(result => {
        res.redirect('/cart');
      })
      .catch(err => console.log(err));
  };

 const postOrder = (req, res, next) => {
     req.user
     .populate('cart.item.productId')
     .execPopulate()
     .then(user => {
         const products = user.cart.items.map(i => {
             return {quantity: i.quantity, product: {...i.productId._doc} }
         });
         const order = new Order({
             user: {
                 name: req.user.name,
                 userId: req.user
             },
             products: products
         });
         return order.save();
     }).then(result => {
         return req.user.clearCart();
        }).then( () => {
            res.redirect('/orders');
        }).catch(err => console.log(err));
 }
const getOrders = (req, res, next) => {
    Order.find({'user.userId': req.user._id })
    .then(orders => {
        res.render('shop/orders',{
            path:'/orders',
            pageTitle:'Your Orders',
            orders: orders,
            isAuthenticated: req.session.isLoggedIn
        });
    }).catch(err => console.log(err));
}; 

module.exports = {
    getProducts,
    getProduct,
    getIndex,
    getCart,
    postCart,
    postCartDeleteProduct,
    getOrders,
    postOrder
} 