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
const multer = require('multer')
const postRouter = require('./route/postRoute')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('public'));
app.use(cookieParser())
app.get('/', (req, res) => {                          
    res.send('hii thihs is home page')
})
// for user route   
app.use('/user', userRouter)

// for chat route 
app.use('/chat', authenticate, chatRouter)

// for message route 
app.use('/message', authenticate, messageRouter)

//for post route
app.use('/post', authenticate, postRouter)


// uploading the image using multer 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./public")
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({ storage })

app.post('/upload', upload.single('croppedImage'), (req, res) => {
    // console.log(req.body)
    // console.log(req.file)
    res.status(200).send(JSON.stringify(req.file.filename))
})

// till here 


// here is socket.io code and connection 
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

io.on('connection', (socket) => {
    console.log('connected to socket.io')
    socket.on('userRoom', (authUserData) => {
        socket.join(authUserData._id)
        socket.emit('connected')
    })

    socket.on('joinChatPage', (roomId) => {
        socket.join(roomId)
    })

    socket.on('newMessage', (getNewMessage) => {
        const { users, data } = getNewMessage
        if (!users || !data) return;
        socket.off('newMessage', arguments.callee)
        users.forEach(user => {
            if (user._id == data.sender) return
            io.to(user._id).emit('newMessage', data)
            socket.on('newMessage', arguments.callee)       
        }) 
    })
})
   