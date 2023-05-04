import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes  from './routes/users.js'
import commentsRoutes  from './routes/comments.js'
import videoRoutes  from './routes/video.js'
import authRoutes  from './routes/auth.js'
import cookieParser from 'cookie-parser'

const app = express()
dotenv.config()

const port = process.env.MONGO

const combine = () => {
    mongoose.connect(port).then(()=>{
        console.log('connected to database successfully!')
    }).catch(err=>{
        throw err
    })
}
app.use(cookieParser())
app.use(express.json())
app.use('/api/users', userRoutes)
app.use('/api/comments', commentsRoutes)
app.use('/api/video', videoRoutes)
app.use('/api/auth', authRoutes)
app.use((err,req,res,next)=>{
    const status = err.status || 500
    const message = err.message || "something went wrong"
    return res.status(status).json({
        success:false,
        status:status,
        message:message
    })


})


app.listen(8000,() => {
    combine()
    console.log('connected to server successfully!')
})