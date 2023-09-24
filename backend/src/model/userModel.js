const mongoose = require('mongoose')

// creating user schema 
const userSchema = mongoose.Schema({
    name:{type:String,default:'' , required:true},
    email:{type:String,default:'' , required:true},
    password:{type:String,default:'' , required:true},
    username:{type:String,default:'' , required:true},
    followers:[{type:mongoose.Schema.Types.ObjectId,ref:'user'}],
    followings:[{type:mongoose.Schema.Types.ObjectId,ref:'user'}],
    profile:{type:String,default:''},
    number:{type:String,default:''}
},{
    timestamps:true
})


const UserModel = mongoose.model('user',userSchema)

module.exports = UserModel