const mongoose = require("mongoose")

const connectDB = async()=> {
    try {
        const conn = await mongoose.connect(process.env.DB_URL)
        if(conn){
            console.log("DB successfully connected to the "+conn.connection.name)
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB
