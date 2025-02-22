const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstname:{
        type:String,
        require:true
    },
    lastname:{
        type:String,
        require:true
    },
    username:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },

    email:{
        type:String,
        require:true
    },
    phoneNumber:{
        type:String,
        require:true
    },
    balance:{
        type:Number,
        default:0
    },
})

const UserModel = mongoose.model('User',userSchema)

module.exports = UserModel;