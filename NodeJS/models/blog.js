const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, { timestamps: true});

const Blog = mongoose.model('Blog', blogSchema, 'prueba'); // el tercer argumento es el nombre de la colección que queremos en MongoDB
module.exports = Blog;