const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    bookname : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    reference : {
        type : String,
        required : true
    }
},{timestamps : true});

const Book = mongoose.model('Book',bookSchema);
module.exports = Book;