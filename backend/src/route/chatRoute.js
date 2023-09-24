const ChatModel = require('../model/chatModel')

const chatRouter = require('express').Router()

chatRouter.get('/', (req, res) => {
    res.send('chat route')
})

chatRouter.post('/', async (req, res) => {
    const { userId } = req.body

    if (!userId) {
        return res.send('this user does not exist')
    }

    let isChat = await ChatModel.find({
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } }
        ]
    }).populate("users", "-password").populate("latestMessage");

    if (isChat.length > 0) {
        res.status(200).send(isChat[0])
    } else {
        let chatData = {
            users: [req.user._id, userId],
            admin: req.user._id
        };
        try {
            const createChat = await ChatModel.create(chatData)

            const finalChat = await ChatModel.findOne({ _id: createChat._id }).populate(
                'users', "-password")
            res.send(finalChat)
        } catch (error) {
            console.log('hiii')
            res.status(400).send(error.message)
        }
    }
})

//getting all chats
chatRouter.get('/allchat',async(req,res)=>{
    try {
        ChatModel.find({users:{$elemMatch:{$eq:req.user._id}}}). populate('users','-password -email'). populate('admin','-password -email').populate('latestMessage').sort({updatedAt:-1}).then((result)=>{
    
          res.status(200).send(result)
      })
    } catch (error) {
       res.status(400).send({error})
    }
})


module.exports = chatRouter