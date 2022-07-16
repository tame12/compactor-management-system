const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    itemName: {
        type: String
    },
    itemQuantity: {
        type: Number
    }
})

module.exports = ItemSchema;