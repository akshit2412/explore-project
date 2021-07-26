import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    post: String,
    name: String,
    creator: String,
    selectedFile: String,
    imgname: String,
    label: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
    likes: {
        type: [String],
        default: [],
    }
})

var PostSchema = mongoose.model('PostSchema', postSchema);

export default PostSchema;