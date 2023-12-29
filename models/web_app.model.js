const mongoose = require('mongoose')
const { Schema } = mongoose


const Categories = new Schema({
    name: {
        type: String,
        required: true
    },
})

const CategoriesModel = mongoose.model('WebApp', Categories);

module.exports = {
    CategoriesModel
}