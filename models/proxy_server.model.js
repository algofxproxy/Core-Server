const mongoose = require('mongoose')
const { Schema } = mongoose

const ProxyServerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    category:{
        type: String,
    }
    // createdAt: Date,
})

const ProxyServerModel = mongoose.model('ProxyServer', ProxyServerSchema);

module.exports = {ProxyServerModel}