const express = require('express');

const router = express.Router();

const { getAddProduct,postAddProduct,
        getEditProduct,postEditProduct,
        getProducts,postDeleteProduct} = require('../controllers/admin');

const isAuth = require('../middleware/is-auth');

//Admin/add-product by GET request
router.get('/add-product', isAuth ,getAddProduct);

//admin/products/ by GET request
router.get('/products', isAuth ,getProducts);

//admin/add-products by POST
router.post('/add-product', isAuth ,postAddProduct);

router.get('/edit-product/:productId', isAuth ,getEditProduct);

router.post('/edit-product', isAuth ,postEditProduct);

router.post('/delete-product', isAuth ,postDeleteProduct);


module.exports = {router};