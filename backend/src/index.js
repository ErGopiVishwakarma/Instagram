const express = require('express')
const cors = require('cors')
const userRouter = require('./route/userRoute')
const connection = require('./config/db')
const messageRouter = require('./route/messageRoute')
const authenticate = require('./middleware/authentication')
const cookieParser = require('cookie-parser')
const chatRouter = require('./route/chatRoute')
const socket = require('socket.io')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.get('/', (req, res) => {
    res.send('hii thihs is home page')
})

app.use('/user', userRouter)
app.use('/chat', authenticate, chatRouter)
app.use('/message', authenticate, messageRouter)

const socketServer = app.listen(process.env.PORT, async () => {
    try {
        await connection
        console.log('connected to db..')
    } catch (error) {
        console.log(error)
    }
})
let currentRoomId;
const io = socket(socketServer, {
    pingTimeout: 600000,
    cors: 'http://localhost:3000'
})

io.on('connection',(socket)=>{
    console.log('connected to socket.io')
    socket.on('userRoom',(authUserData)=>{
        socket.join(authUserData._id)
        socket.emit('connected')
    })

    socket.on('joinChatPage',(roomId)=>{
        socket.join(roomId)
    })

    socket.on('newMessage',(getNewMessage)=>{
        const {users,data} = getNewMessage
        if(!users || !data) return;

        users.forEach(user=>{
            if(user._id == data.sender) return 
            io.to(user._id).emit('recieveMessage',data)
        })
    })
})

// io.on('connection', (socket) => {
//     console.log('connected to backend')
//     socket.on('roomSetup', (userData) => {
//         socket.join(userData._id)
//         socket.emit('connected')
//     })

//     socket.on('joinChatPage', (roomId) => {
   
//         if(currentRoomId){
//             socket.leave(currentRoomId)
//         }
//         currentRoomId = roomId
//         socket.join(roomId)
//     })

//     socket.on('newMessage', (getNewMessage) => {

//         const { users, data } = getNewMessage;
//         if (!users || !data) return;

//         users.forEach(user => {
//             if (user._id === data.sender) return;  // Skip sender
//             io.to(user._id).emit('recieveMessage', data);
//             return
//         });
//     })
// })