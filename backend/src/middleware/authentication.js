const jwt = require('jsonwebtoken')
const cookie = require('cookie')
const UserModel = require('../model/userModel')


const authenticate = async(req, res , next) =>{
     const token = req.headers.authorization?.split(" ")[1]
     if(token){ 
        try {
            const decoded= jwt.verify(token,'instagram')
            const id=decoded.userId
            await UserModel.findById(id).then(res=>{
                req.user= res
                next()
            })
        } catch (error) { 
            res.send({error})
        }
     }else{
        res.send({error:'please login first.'})
     }
}
 
module.exports=authenticate