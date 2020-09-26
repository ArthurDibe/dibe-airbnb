const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BookSchema = new Schema({
    roomTitle:{
        type: String,
        unique: true
    },
    userEmail:{
        type: String
    },
    location:{
        type: String,
    },
    dateDocument:
    {
        type:Date,
        default: Date.now()
    }
});

const bookModel = mongoose.model("Books", BookSchema);

module.exports=bookModel;