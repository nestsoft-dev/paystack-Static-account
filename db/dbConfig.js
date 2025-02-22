const mongoose = require('mongoose');

const connectDB = async(req,res)=>{
try {
    mongoose.connect('mongodb+srv://parabellum:bluu12345@cluster0.5kumd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then((val)=>console.log("Database Connected")
    );
} catch (error) {
    console.log(error.message);
    
}
}

module.exports = connectDB