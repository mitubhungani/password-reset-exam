const mongoose = require('mongoose')

const dbConnect = async () =>{
    try {
        await mongoose.connect('mongodb://localhost:27017/passportjsexam')
        console.log('Connected to MongoDB');
        
    } catch (error) {
         console.error("error connecting to")
    }
}

module.exports = dbConnect;