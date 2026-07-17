require("dotenv").config()

const express = require("express")
const cors = require("cors")
const connectDB = require('./config/connectDB')

const app = express()
connectDB()


app.use(cors({
    origin : "https://secure-note-sharing-app.vercel.app"
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