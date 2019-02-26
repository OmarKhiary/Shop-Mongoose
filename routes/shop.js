const path = require('path')

const express = require('express');

const router = express.Router();

const {getProducts,getIndex,getProduct,getCart,postCart,postCartDeleteProduct,getOrders,postOrder} = require('../controllers/shop');

router.get('/', getIndex);

router.get('/products',getProducts);

router.get('/products/:productId',getProduct);

router.get('/cart', getCart);

router.post('/cart', postCart);

router.post('/cart-delete-item', postCartDeleteProduct);

router.get('/orders',getOrders);

router.post('/create-order', postOrder);

module.exports = router;