import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import { connect } from "./config/db.js"
import { errorHandler } from "./middlewares/error.middlewares.js"
import { authRouter } from "./routes/auth.route.js"

const app = express()
dotenv.config()
const port = process.env.PORT ; 
connect(process.env.MONGO_URI)

// middlwares
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.use(cors);

// routing
app.use("/api/v1/auth",authRouter)





app.use(errorHandler)
app.listen(port,()=>{
    console.log(`Server running at port ${port}`)
})

