const PostModel = require('../model/postModel')

const postRouter = require('express').Router()

// adding a post to database 
postRouter.post('/', async (req, res) => {
    const { postUrl, size, highlights } = req.body
    try {
        const userPost = new PostModel({ postUrl, size, highlights, postedBy: req.user._id })
        await userPost.save().populate('postedBy', '-email -password').populate('likes', 'name username _id profile').populate({
            path: 'comments.like comments.commentedBy',
            model: 'user',
            select: 'name username profile _id'
        })
        console.log(userPost)
        res.status(200).send(userPost)
    } catch (error) {
        res.status(400).send({ error })
    }
})

// getting all post from database 
postRouter.get('/', async (req, res) => {
    try {
        const data = await PostModel.find().populate('postedBy', '-email -password').populate('likes', 'name username _id profile').populate({
            path: 'comments.like comments.commentedBy',
            model: 'user',
            select: 'name username profile _id'
        })
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send({ error })
    }
})

// getting particular user posts 
postRouter.get('/:id', async (req, res) => {
    const {id} = req.params
    try {
        const data = await PostModel.find({postedBy:id}).populate('postedBy', '-email -password').populate('likes', 'name username _id profile').populate({
            path: 'comments.like comments.commentedBy',
            model: 'user',
            select: 'name username profile _id'
        })
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send({ error })
    }
})

// deleting a post of authorized user 
postRouter.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const data = await PostModel.findByIdAndDelete(id, { new: true })
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send({ error })
    }
})

// like particular post 
postRouter.put('/like/:id', async (req, res) => {
    const { id } = req.params
    try {
        const data = await PostModel.findById(id)
        if (data.likes.includes(req.user._id)) {
            PostModel.findByIdAndUpdate(id, {
                $pull: { likes: req.user._id }
            }, {
                new: true
            }).populate('likes', 'name username _id profile').populate({
                path: 'comments.like comments.commentedBy',
                model: 'user',
                select: 'name username profile _id'
            }).then(result => {
                res.status(200).send(result)
            }).catch(err => {
                res.status(400).send({ error: err })
            })
        } else {
            PostModel.findByIdAndUpdate(id, {
                $push: { likes: req.user._id }
            }, {
                new: true
            }).populate('likes', 'name username _id profile').then(result => {
                res.status(201).send(result)
            }).catch(err => {
                res.status(400).send({ error: err })
            })
        }
    } catch (error) {
        res.status(400).send({ error })
    }
})

// all comment functionality here 
// adding comment of a particular post 
postRouter.put('/comment/:id', async (req, res) => {
    const { id } = req.params
    try {
        PostModel.findByIdAndUpdate(id, {
            $push: { comments: { ...req.body, commentedBy: req.user._id } }
        }, {
            new: true
        }).populate('postedBy', '-email -password').populate('likes', 'name username _id profile').populate({
            path: 'comments.like comments.commentedBy',
            model: 'user',
            select: 'name username profile _id'
        }).then(result => {
            res.status(200).send(result)
        }).catch(err => {
            res.status(400).send({ error: err })
        })
    } catch (error) {
        res.status(400).send({ error })
    }
})

// postRouter.put('/comment/reply/:id',async(req,res)=>{
//     const { id } = req.params
//     try {
//         PostModel.findByIdAndUpdate(id).then(ans=>{
//          {
//             $push: { comments?.replys: { ...req.body, postedBy: req.user._id } }
//         }, {
//             new: true
//         })
//         .populate("comments.postedBy").then(result => {
//             res.status(200).send(result)
//         }).catch(err => {
//             res.status(400).send({error:err})
//         })
//     } catch (error) {
//         res.status(400).send({ error })
//     }
// })




// detecting and adding the user view of a particular post 
// postRouter.put('/view/:id', async (req, res) => {
//     const { id } = req.params
//     try {
//         const data = await PostModel.findById(id)
//         if (data.views.includes(req.user._id)) {
//             PostModel.findByIdAndUpdate(id, {
//                 $pull: { views: req.user._id }
//             }, {
//                 new: true
//             }).then(result => {
//                 res.status(200).send(result)
//             }).catch(err => {
//                 res.status(400).send({ error: err })
//             })
//         } else {
//             PostModel.findByIdAndUpdate(id, {
//                 $push: { views: req.user._id }
//             }, {
//                 new: true
//             }).then(result => {
//                 res.status(201).send(result)
//             }).catch(err => {
//                 res.status(400).send({ error: err })
//             })
//         }
//     } catch (error) {
//         res.status(400).send({ error })
//     }
// })

module.exports = postRouter