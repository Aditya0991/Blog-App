const mongoose = require('mongoose');

const dbConnect = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("DB connected")
    }
    catch(err){
        console.log(`Error in connection ${err}`);
    }

}

module.exports = dbConnect;