require("dotenv").config()

const express = require("express")
const cors = require("cors")
const connectDB = require('./config/connectDB')

const app = express()
connectDB()

const allowedOrigins = [
    "http://localhost:5173",
    process.env.CLIENT_URL
]

app.use(cors({
    origin: function(origin, callback) {
        if(!origin) return callback(null, true)
        if(allowedOrigins.indexOf(origin) === -1) {
            const msg = "The CORS policy for this site does not allow access from the specified Origin."
            return callback(new Error(msg), false)
        }
        return callback(null, true)
    }
}))
app.use(express.json())

app.get("/", (req, res)=> {
    return res.send("Note sharing API is running....")
})

const NoteRoutes = require("./routes/NoteRoutes")
const AuthRoutes = require("./routes/AuthRoutes")
const ShareRoutes = require("./routes/ShareRoutes")

app.use("/api/v1/notes", NoteRoutes)
app.use("/api/v1/auth", AuthRoutes)
app.use("/api/v1/share", ShareRoutes)


app.use((req, res)=> {
    return res.status(404).json({
        success : false,
        message : "Route Not Found"
    })
})

const PORT = process.env.PORT
app.listen(PORT, ()=> {
    console.log(`Server is running on PORT ${PORT}`)
})