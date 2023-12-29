const CategoriesModel = require('../models/store.model').CategoriesModel;

async function GetCatgories (){
    let categories = await CategoriesModel.find();
    return categories
}

async function InsertCatgories (category_data){
    const category = CategoriesModel.create(category_data);
    await category.save();
    console.log("inserted category" + category)
    return true
}

module.exports = {
    GetCatgories,
    InsertCatgories
}