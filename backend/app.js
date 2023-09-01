const express=require('express')
const router=require('./routes/route.js')
require('dotenv').config()
const userRouter=require('./routes/user.js')
const videoRouter=require('./routes/video.js')
const commentRouter=require('./routes/comment.js')
const cookieParse=require('cookie-parser')
const cors=require('cors')

const app=express()

app.use(cookieParse())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(
    cors({
      origin: ["http://localhost:3000"],
      credentials: true,
    })
);

app.use(router)
app.use('/user',userRouter)
app.use('/video',videoRouter)
app.use('/comment',commentRouter)

app.listen(process.env.PORT,()=>console.log(`port is connected to 4000`))
