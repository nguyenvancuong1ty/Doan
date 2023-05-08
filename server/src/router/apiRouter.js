const express = require('express');
const router = express.Router();
const {
    apiGetUsers,
    // apiCreateUser,
    // apiDeleteUser,
    // apiUpdateUser,
    // apiLogin,
    // apiGetInfo,
    // apiGetCakes,
    // apiAddCake,
    // apiUpdateCake,
    // apiGetNewProduct,
    // apiGetVoucher,
    // apiAddVoucher,
    // apiUpdateVoucher,
    // apiDeleteVoucher,
    // apiGetCakedatil,
    // apiGetCakedatilA,
    // apiAddCakeDetail,
    // apiUpdateCakeDetail,
    // apiGetNews,
    // apiAddNews,
    // apiUpdateNews,
    // apiDeleteNews,
    // apiGetRecipe,
    // apiAddRecipe,
    // apiUpdateRecipe,
    // apiDeleteRecipe,
    // apiGetCart,
    // apiGetCartById,
    // apiPutCart,
    // apiDeleteCart,
    // apiAddCart,
    // apiDeleteCakes,
    // apiDeleteCakeDetail,
    // apiSearch,
} = require('../controllers/apiController');
const { apiLogin } = require('../controllers/AccountController');
// user
router.get('/users', apiGetUsers);
// router.post('/users', apiCreateUser);
router.post('/login', apiLogin);
// router.delete('/users', apiDeleteUser);
// router.put('/users', apiUpdateUser);
// //end

// // info
// router.get('/intro', apiGetInfo);
// //cake
// router.get('/cakes', apiGetCakes);
// router.post('/cakes', apiAddCake);
// router.put('/cakes', apiUpdateCake);
// router.delete('/cakes', apiDeleteCakes);

// //newProduct
// router.get('/newProduct', apiGetNewProduct);

// // Voucher
// router.get('/voucher', apiGetVoucher);
// router.post('/voucher', apiAddVoucher);
// router.put('/voucher', apiUpdateVoucher);
// router.delete('/voucher', apiDeleteVoucher);

// // Detail cake
// router.get('/cakedetail/:sale', apiGetCakedatilA);
// router.get('/cakedetail', apiGetCakedatil);
// router.delete('/cakedetail', apiDeleteCakeDetail);
// router.post('/cakedetail', apiAddCakeDetail);
// router.put('/cakedetail', apiUpdateCakeDetail);

// // News
// router.get('/news', apiGetNews);
// router.post('/news', apiAddNews);
// router.put('/news', apiUpdateNews);
// router.delete('/news', apiDeleteNews);

// // Cake recipe
// router.get('/recipe', apiGetRecipe);
// router.post('/recipe', apiAddRecipe);
// router.put('/recipe', apiUpdateRecipe);
// router.delete('/recipe', apiDeleteRecipe);

// // Cart
// router.get('/cake_by_cart/:userId', apiGetCart);

// router.put('/cake_by_cart', apiPutCart);

// router.delete('/cake_by_cart', apiDeleteCart);

// router.post('/cake_by_cart', apiAddCart);

// router.get('/cart/:userId', apiGetCartById);

// //Search
// router.post('/search', apiSearch);

module.exports = router;
