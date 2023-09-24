
const ChatModel = require('../model/chatModel');
const MessageModel = require('../model/messageModel');
const UserModel = require('../model/userModel');

const messageRouter = require('express').Router()

messageRouter.post('/', async (req, res) => {
    const { content, chatId } = req.body;
    if (!content || !chatId) {
        console.log('Invalid data')
        return res.sendStatus(400).send('Invalid data')
    }

    var messageObject = {
        sender: req.user._id,
        content: content,
        chatId: chatId
    }

    try {

        var message = await MessageModel.create(messageObject)
        await ChatModel.findByIdAndUpdate(chatId, {
            latestMessage: message._id,
        })

        res.status(200).send(message)
    } catch (error) {
        res.send({ msg: 'something wrong', err: error.message })
    }
})

messageRouter.get('/message/:chatId', async (req, res) => {
    const {chatId} = req.params

    try {
        const allMessages = await MessageModel.find({chatId:chatId})

        res.status(200).send(allMessages)
    } catch (error) {
        res.status(400).send({error})
    }
})


module.exports = messageRouter