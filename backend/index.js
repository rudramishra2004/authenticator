import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import authRouter from "./routes/auth.routes.js"
import cookieParser from "cookie-parser"
import cors from "cors"
dotenv.config()

let port = process.env.PORT || 5000
let app = express()
app.use(express.json())
app.use(cors({
    origin:"https://authenticator-7s7n.onrender.com",
    credentials:true
}))
app.use(cookieParser())
app.use("/api",authRouter)

app.listen(port, ()=>{
    connectDB()
    console.log(`sever is started on port ${port}`)
})
