/* 
 * To create a schema, just require mongoose, and set the json needed as the 
 * data model.
 */


var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
    fName: String,
    lName: String,
    department: String,
    date: Date,
    job: String,
    salary: Number,
    createdOn: {
        type: Date,
        "default": Date.now
    }
});

var Review = mongoose.model('Review', reviewSchema);

module.exports = Review;