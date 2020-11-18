const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articlesSchema = new Schema({
    title: {type: String,  unique: true},
    slug: {type: String,  unique: true},
    body: {type : String},
    categorySlug : { type : String },

})

module.exports = mongoose.model('Articles', articlesSchema);