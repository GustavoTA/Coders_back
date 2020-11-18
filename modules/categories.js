const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategoriesSchema = new Schema({
    title: {type: String},
    slug: {type: String},

})

module.exports = mongoose.model('Categoreis', CategoriesSchema);