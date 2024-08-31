// ! BLACK BELT FEATURES
// Advanced Validations
// Normalize Server-side Error Messages

const mongoose = require('mongoose');

const bannedStoreNumbers = [1049, 36, 245, 20937, 4];

const StoreSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true , "Store name is required!"],
        minLength: [3 , "Store Name must contain 3 characters!"]
    },
    number:{
        type: Number,
        required: [true , "Store number is required!"],
        min: [1, "Must be a number greater than 0!"],
        validate: {
            validator: function (value) {
                return !bannedStoreNumbers.includes(value);
            },
            message: props => `Store number ${props.value} is banned and cannot be added.`
        }
    },
    open: {
        type: Boolean,
        required: [true , "Open Status is required!"]
    }
} , {timestamps: true});

const Store = mongoose.model('Store' , StoreSchema);
module.exports = Store;