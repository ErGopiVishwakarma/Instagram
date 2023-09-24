const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
       post:{type:String,default:''},
       highlights:{type:String,default:''},
       postedBy:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
       likes:[{type:mongoose.Schema.Types.ObjectId,ref:'user'}],
       views:[{type:mongoose.Schema.Types.ObjectId,ref:'user'}],
       comments:[{
        text:{type:String,default:''},
        likes:[{type:mongoose.Schema.Types.ObjectId,ref:'user'}],
        replys:[{type:mongoose.Schema.Types.ObjectId,ref:'user'}],
        commentedBy:{type:mongoose.Schema.Types.ObjectId,ref:'user'}
       }]
},{
    timestamps:true
})

const PostModel = mongoose.model('post',postSchema)

module.exports = PostModel