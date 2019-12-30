const express = require('express');
const router = express.Router();

//get from userjs in controllers
const { create, productById, read, remove, update } = require('../controllers/product'); 
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth'); 
const { userById } = require('../controllers/user');

// read the product by id
router.get('/product/:productId', read)

// post the product 
router.post(
    '/product/create/:userId',
     requireSignin,
      isAuth,
       isAdmin,
        create
        );

// delete the product by id
router.delete('/product/:productId/:userId', requireSignin, isAuth, isAdmin, remove);


// update the product by id
router.put('/product/:productId/:userId', requireSignin, isAuth, isAdmin, update);



//secure signin middleware
//router.get('/hello', requireSignin, (req, res) =>{
  //  res.send("hello there");
//});

router.param('userId', userById);
router.param('productId', productById);

module.exports = router;