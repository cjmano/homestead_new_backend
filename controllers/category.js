const Category = require('../models/category');
const { errorHandler } = require('../helpers/dbErrorHandler');



exports.categoryById = (req, res, next, id) =>{
    Category.findById(id).exec((err, category) =>{
        if(err || !category){
            return res.status(400).json({
                error: 'Category does not exit'
            });
        }
    req.category = category;
    next();
    });

};

// create category
exports.create = (req, res) => {
    const category = new Category(req.body);
    category.save((err, data) =>{
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({data});
    });
};


//read category

exports.read = (req, res) =>{
    return res.json(req.category);
};



//update category
exports.update = (req, res) => {
    console.log('req.body', req.body);
    console.log('category update param', req.params.categoryId);

    const category = req.category;
    category.name = req.body.name;
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};


//remove category

exports.remove = (req, res) => {
    const category = req.category;
    category.remove((err, data) => {
        if (err) {
            return res.status(400).json({
            error: errorHandler(err)
            });
        } 
                res.json({
                    message: 'Category deleted'
                });
            });
   
};


//list category
exports.list = (req, res) => {
    Category.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};