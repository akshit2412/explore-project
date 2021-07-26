import express from 'express';
import PostSchema from '../models/postSchema.js'
import auth from "../middleware/auth.js";


const router = express.Router();


//get posts
router.get('/allposts/:start', async (req, res) => {
    const { start } = req.params;
    try {
        const startIndex = parseInt(start);
        const endIndex = startIndex + 12;
        const allposts = await PostSchema.find();
        const posts = allposts.slice(startIndex, endIndex);
        res.status(200).json({ posts: posts, postslength: allposts.length });

    }
    catch (error) {
        res.status(404).json({ message: error.message });

    }

});


//create post
router.post('/', auth, async (req, res) => {
    const post = req.body;
    try {
        const newPost = new PostSchema({ ...post, creator: req.userId, name: req.name, createdAt: new Date().toISOString() });
        await newPost.save()
        res.json({
            code: 200,
            id: newPost._id
        })
    } catch (error) {
        res.status(409).json({ message: error.message });
    }

});

//imgpost
router.post('/imgpost', auth, async (req, res) => {
    const { img, id, imgname } = req.body;
    try {
        const post = await PostSchema.findOne({ _id: id });
        post.selectedFile = img;
        post.imgname = imgname;
        await post.save();
        res.json({
            code: 200,
        })


    } catch (error) {
        res.status(409).json({ message: error.message });

    }

})

//delete post
router.post('/delete', auth, async (req, res) => {
    const post_id = req.body._id;


    try {
        await PostSchema.deleteOne({ _id: post_id });
        res.json({
            code: 200,
        })

    } catch (error) {
        res.status(409).json({ message: error.message });

    }

});


//edit post
router.post('/edit', auth, async (req, res) => {
    const post_id = req.body._id;
    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
    }


    try {
        const post = await PostSchema.findOne({ _id: post_id });
        post.title = req.body.title;
        post.post = req.body.post;
        post.label = req.body.label;
        if (req.body.selectedFile)
            post.selectedFile = req.body.selectedFile;

        await post.save();

        res.json({
            code: 200,
            id: post._id
        })

    } catch (error) {
        res.status(409).json({ message: error.message });

    }

});


//imgedit post
router.post('/imgedit', async (req, res) => {
    const { img, id, imgname } = req.body;


    try {
        const post = await PostSchema.findOne({ _id: id });
        post.imgname = imgname;
        post.selectedFile = img;
        await post.save();

        res.json({
            code: 200,
        })

    } catch (error) {
        res.status(409).json({ message: error.message });

    }

});




//love post
router.post('/love', auth, async (req, res) => {
    const post_id = req.body._id;

    try {
        const post = await PostSchema.findOne({ _id: post_id });
        const index = post.likes.findIndex((id) => id === String(req.userId));

        if (index === -1) {
            post.likes.push(req.userId);
        } else {
            post.likes = post.likes.filter((id) => id !== String(req.userId));
        }

        await PostSchema.findByIdAndUpdate(post_id, post, { new: true });


        res.json({
            code: 200,
            post: post,
        })

    } catch (error) {
        res.status(409).json({ message: error.message });

    }


});


//get post by id
router.get('/:id', async (req, res) => {

    const { id } = req.params;

    try {
        const post = await PostSchema.findOne({ _id: id });
        res.status(200).json(post);

    } catch (error) {
        res.status(409).json({ message: error.message });
    }

})

//get userpost by id
router.get('/content/:id/:start', async (req, res) => {

    const { id } = req.params;
    const { start } = req.params;

    try {
        const startIndex = parseInt(start);
        const endIndex = startIndex + 12;
        const allposts = await PostSchema.find({ creator: id });
        const posts = allposts.slice(startIndex, endIndex);
        res.status(200).json({ posts: posts, postslength: allposts.length });

    } catch (error) {
        res.status(409).json({ message: error.message });
    }

})





export default router;