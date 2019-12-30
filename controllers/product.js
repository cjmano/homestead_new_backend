const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const Product = require('../models/product');
const { errorHandler } = require('../helpers/dbErrorHandler');


//product
exports.productById = (req, res, next, id) =>{
    Product.findById(id).exec((err, product) => {
        if(err || !product){
        return res.status(400).json({
            error: 'Product not found'
        });
    }
        req.product = product;
        next();
    
    });
};


exports.read = (req, res) => {
    req.product.photo = undefined;
    return res.json(req.product);
};






//product upload & save

exports.create = (req, res) => {
let form = new formidable.IncomingForm();
form.keepExtensions = true;
form.parse(req, (err, fields, files) =>{
    if(err){
        return res.status(400).json({
            error: 'Image could not be uploaded'
        });
    }



    //check all fields
    const { productsku, productname, price, category, quantity, photo, shipping, productshort, productlong } = fields;

    if (!productsku || !productname || !price || !category || !quantity || !productshort || !productlong) {
        return res.status(400).json({
            error: 'All fields are required'
        });
    }



    let product = new Product(fields);

    // 1kb = 1000
    // 1mb = 1000000

    if (files.photo) {
        // console.log("FILES PHOTO: ", files.photo);
        if (files.photo.size > 1000000) {
            return res.status(400).json({
                error: 'Image should be less than 1mb in size'
            });
        }
        product.photo.data = fs.readFileSync(files.photo.path);
        product.photo.contentType = files.photo.type;
    }

    product.save((err, result) =>{
        if(err){
            return res.status(400).json({
                error: errorHandler(error)
            });
        }
        res.json(result);
    });
});
};

//product update
exports.update = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) =>{
        if(err){
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        }
    
    
    
        //check all fields
        const { productsku, productname, price, category, quantity, photo, shipping, productshort, productlong } = fields;
    
        if (!productsku || !productname || !price || !category || !quantity || !productshort || !productlong) {
            return res.status(400).json({
                error: 'All fields are required'
            });
        }
    
    
    
        let product = req.product;
        product = _.extend(product, fields);
    
        // 1kb = 1000
        // 1mb = 1000000
    
        if (files.photo) {
            // console.log("FILES PHOTO: ", files.photo);
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: 'Image should be less than 1mb in size'
                });
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }
    
        product.save((err, result) =>{
            if(err){
                return res.status(400).json({
                    error: errorHandler(error)
                });
            }
            res.json(result);
        });
    });
    };

    
//delete the product
exports.remove = (req, res) => {
    let product = req.product
    product.remove((err, deletedProducted) =>{
        if(err){
            return res.status(400).json({
                error: errorHandler(error)
            });
        }
        res.json({
            
            message: "Product deleted Successfully"
        });
    });
};