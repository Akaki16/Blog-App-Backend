const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define blog schema
const blogSchema = new Schema({
    author: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
});

// transform blog schema
blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString(),
        delete returnedObject._id,
        delete returnedObject.__v
    }
});

// define blog model which extends blog schema
const Blog = mongoose.model('Blog', blogSchema);

// export blog model
module.exports = Blog;