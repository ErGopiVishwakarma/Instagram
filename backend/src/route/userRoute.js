const userRouter = require("express").Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const UserModel = require("../model/userModel");
const emailValidator = require('deep-email-validator')
const cookie = require('cookie');
const authenticate = require("../middleware/authentication");




userRouter.post('/register', async (req, res) => {
    const { name, email, password, username } = req.body

    try {
        // validating the email which is valid or not 
        const { valid, reason, validators } = await emailValidator.validate(email);
        if (valid) {
            console.log('step1')
            // looking in database this user is already exist or not 

            const users = await UserModel.find({ email })
            console.log(users)
            if (users.length > 0) {
                res.status(200).send({ msg: 'email already registered' })
            } else {
                console.log('step2')
                // looking the username uniqueness 
                const hasUsername = await UserModel.find({ username })
                if (hasUsername.length > 0) {
                    res.status(400).send({ msg: 'invailid username' })
                } else {
                    // adding new user to database 
                    bcrypt.hash(password, 5, async (err, hash) => {
                        if (err) {
                            res.status(400).send({ msg: err })
                        } else {
                            const user = new UserModel({ name, email, password: hash, username })
                            await user.save()
                            res.status(200).send(user)
                        }
                    })
                }
            }
        } else {
            res.status(400).send({ msg: 'invailid email', reason })
        }
    } catch (error) {
        res.send({ msg: error })
    }
})


// login route 
userRouter.post('/login', async (req, res) => {
    const { email, password } = req.body

    if (typeof password !== 'string') {
        return res.status(400).send({ msg: 'Invalid password format' });
    }
    try {
        const user = await UserModel.find({ email })
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, async (err, result) => {
                if (result) {
                    const token = jwt.sign({ userId: user[0]._id }, 'instagram')
                    res.status(200).send({ msg: 'user has been successfully login...', token, user: user[0] })
                } else {
                    res.status(400).send({ msg: err })
                }
            })
        } else {
            res.status(400).send({ msg: 'login failed...' })
        }
    } catch (error) {
        res.status(400).send({ msg: 'somthing went wrong...', error: error.message })
    }
})


// searching user 

userRouter.get('/search', authenticate, async (req, res) => {
    if (!req.query.search) {
        return res.status(200).send([])
    }
    const searchData = req.query.search ? {
        $or: [
            { "name": { $regex: req.query.search, $options: 'i' } },
            { "username": { $regex: req.query.search, $options: 'i' } },
        ]
    } : {};

    try {
        const user = await UserModel.find(searchData).find({ _id: { $ne: req.user._id } }).select('-password -email').populate('followers', '_id name username profile').populate('followings', '_id name username profile')
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send({ error })
    }
})


// getting auth user data 

userRouter.get('/getuser/:id', authenticate, async (req, res) => {
    const { id } = req.params
    try {
        const user = await UserModel.findById(id).select('-password -email').populate('followers', '_id name username profile').populate('followings', '_id name username profile')
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send({ error })
    }
})

// getting all available user 
userRouter.get('/getalluser', authenticate, async (req, res) => {
    // { _id: { $ne: req.user._id } }
    try {
        let user = await UserModel.find().select('-password -email')
       
        for (let i = 0; i < user.length; i++) {
            let index = Math.floor(Math.random(0) * user.length)
              if(index<0){
                index=0
              }
            [user[i],user[index]] = [user[index],user[i]]
        }
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send({ error })
    }
})

userRouter.get('/userprofile/:id', authenticate, async (req, res) => {
    const { id } = req.params
    if (id) {
        try {
            const user = await UserModel.findById(id).select('-password -email').populate('followers', '_id name username profile').populate('followings', '_id name username profile')
            res.status(200).send(user)
        } catch (error) {
            res.status(400).send({ error })
        }
    } else {
        res.status(400).send({ error: 'invailid request route' })
    }

})


// follow and unfollow logic is here 

userRouter.put('/follow', authenticate, async (req, res) => {
    UserModel.findByIdAndUpdate(req.body.followerId, {
        $push: { followers: req.user._id }
    }, { new: true }).select('-password -email').populate('followers', '_id name username profile').populate('followings', '_id name username profile').then(result => {
        UserModel.findByIdAndUpdate(req.user._id, {
            $push: { followings: req.body.followerId }
        }, { new: true }).select('-password -email').then(value => {
            res.status(200).send(result)
        }).catch(error => {
            res.status(400).send({ error })
        })
    }).catch(error => {
        res.status(400).send({ error })
    })
})

userRouter.put('/unfollow', authenticate, async (req, res) => {
    UserModel.findByIdAndUpdate(req.body.unfollowId, {
        $pull: { followers: req.user._id }
    }, { new: true }).select('-password -email').populate('followers', '_id name username profile').populate('followings', '_id name username profile').then(result => {
        UserModel.findByIdAndUpdate(req.user._id, {
            $pull: { followings: req.body.unfollowId }
        }, { new: true }).select('-password -email').then(value => {
            res.status(200).send(result)
        }).catch(error => {
            res.status(400).send({ error })
        })
    }).catch(error => {
        res.status(400).send({ error })
    })
})


module.exports = userRouter  