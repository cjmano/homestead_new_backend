const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;


const productSchema = new mongoose.Schema(
    {
        productsku: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
       },
       productname: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
       },

       price: {
        type: Number,
        trim: true,
        required: true,
        maxlength: 32
       },

       category: {
        type: ObjectId,
        ref: 'Category',
        required: true,
        },
        
        quantity: {
            type: Number,
            
           },

           sold: {
            type: Number,
            default: 0
           },

        photo: {
        data: Buffer,
        contentType: String
        },

        shipping: {
        required: false,
        type: Boolean
            },

       productshort: {
        type: String,
        trim: true,
        required: true,
        maxlength: 250
       },

       productlong: {
        type: String,
        required: true,
        maxlength: 700
       }
    },
{ timestamps: true }
);


module.exports = mongoose.model('Product', productSchema);