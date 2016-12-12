/* 
 * To create a schema, just require mongoose, and set the json needed as the 
 * data model.
 */


var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    product: String,
    description: String,
    price: String,
    createdOn: {
        type: Date,
        "default": Date.now
    }
});

var Product = mongoose.model('Product', productSchema);

module.exports = Product;