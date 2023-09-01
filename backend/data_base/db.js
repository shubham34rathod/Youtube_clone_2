let mongoose=require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.DB_URL+process.env.DB_NAME)
.then(()=>console.log('connected to database'))
.catch(()=>console.log('connection error'))

//user schema.......

let UserSchema=new mongoose.Schema({
    name:{type:String,unique:true},
    email:{type:String,unique:true},
    password:{type:String},
    profile_img:{type:String},
    image:{type:String},
    subscribers:{type:Number,default:0},
    subscribedUsers:{type:[String]},
},{timestamps:true})

let userModel=mongoose.model('user_data',UserSchema)



//video schema........

let VideoSchema=new mongoose.Schema({
    userId:{type:String},
    user_name:{type:String},
    user_profile:{type:String},
    title:{type:String},
    describtion:{type:String},
    img_url:{type:String},
    video_url:{type:String},
    video_views:{type:Number,default:0},
    tags:{type:[String]},
    likes:{type:[String]},
    dislikes:{type:[String]}
},{timestamps:true})

let videoModel=mongoose.model('video_info',VideoSchema)


//comment schema.......

let CommentSchema=new mongoose.Schema({
    userId:{type:String},
    videoId:{type:String},
    describtion:{type:String},
    user_profile:{type:String},
    user_name:{type:String}
},{timestamps:true})

let commentModel=mongoose.model('comment',CommentSchema)


module.exports={userModel,videoModel,commentModel}