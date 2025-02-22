const express = require('express')
var jwt = require('jsonwebtoken');
const { registerUser, loginUser } = require('../controllers/userController');
const UserModel = require('../models/userModel');

const routes = express.Router()

routes.post('/register',registerUser)


routes.post('/login',loginUser)

routes.get('/get-user/:token',async(req,res)=>{
const {token} = req.params
const id =jwt.verify(token, 'ikenna').id
const gottenUser = await UserModel.findById(id)
if(gottenUser) return res.status(200).send({status:true,data:gottenUser})
    res.status(500).send({status:false,message:'user not found'})
})

module.exports = routes

