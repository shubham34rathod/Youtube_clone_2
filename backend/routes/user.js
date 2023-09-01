let express=require('express')
let mongoose=require('mongoose')
let bcrypt=require('bcrypt')
let {userModel, videoModel}=require('../data_base/db.js')

let router=express.Router()

//create user or signUp

router.post('/signUp',async(req,res)=>{
    try 
    {
        // console.log(req.body);
        let salt=bcrypt.genSaltSync(10)
        let hash=await bcrypt.hash(req.body.password,salt)
        // console.log(hash);
        let newUser=new userModel({...req.body,password:hash})
        await newUser.save()
        res.status(200).json('user has been created')
    } 
    catch (error) 
    {
        res.json(error)
    }
})

//sign in 

router.post('/signIn',async(req,res)=>{
    try 
    {
        // console.log(req.body);
        let user=await userModel.findOne({name:req.body.name})
        if(!user)
        {
            res.json('user not found')
        }
        else
        {
            let check_password=await bcrypt.compare(req.body.password,user.password)
            if(check_password)
            {
                //pending code.....
                let {password,...other}=user._doc
                // res.status(200).json([other,'login successfull'])
                // res.cookie("user_id",other,{
                //     httpOnly:true,
                //     secure:true,
                //     sameSite:'none'
                // }).send()
                // console.log('id is',other._id);


                // res.status(200).cookie('userID',other._id,{
                //     express:new Date(Date.now()+10000)
                // }).json([other,'login successfull'])

                res.status(200).json([other,'login successfull'])
            }
            else
            {
                res.json('incorrect password')
            }
        }
    } 
    catch (error) 
    {
        res.json(error)
    }
})

//update user

router.put('/update_User/:id',async (req,res)=>{
    try 
    {
        let id=req.params.id
        let updateUser=await userModel.findByIdAndUpdate(id,{$set:req.body},{new:true})
        res.status(200).json(updateUser)
    } 
    catch (error) 
    {
        res.json(error)
    }
})

//delete user

router.delete('/delete_user/:id',async (req,res)=>{
    try 
    {
        let id=req.params.id
        let delete_User=await userModel.findByIdAndDelete(id)
        res.status(200).json('user has been deleted')
    } 
    catch (error) 
    {
        res.json(error)
    }
})

//get user

router.get('/get_user/:id',async(req,res)=>{
    try 
    {
        let id=req.params.id
        // console.log('user id',id);
        let user=await userModel.findById(id)
        res.status(200).json(user)
    } 
    catch (error) 
    {
        res.json(error)
    }
})

//subscribe user

router.get('/sub/:id/:userID',async(req,res)=>{
    try 
    {
        console.log('sub called');
        let id=req.params.id
        let newSubscriber=req.params.userID
        console.log(req.params);
        // let newSubscriber=req.cookies.userID
        console.log(newSubscriber,id);
        await userModel.findByIdAndUpdate(newSubscriber,{$push:{subscribedUsers:id}})
        await userModel.findByIdAndUpdate(id,{$inc:{subscribers:1}})
        res.status(200).json('Subscription successful')
    } 
    catch (error) 
    {
        res.json(error)
    }
})

//unsubscribe user

router.get('/unsubscribe/:id/:userID',async(req,res)=>{
    try 
    {
        let id=req.params.id
        let newSubscriber=req.params.userID
        // let newSubscriber=req.cookies.userID
        console.log('un_sub called');
        // console.log('un_sub called',newSubscriber,id);
        await userModel.findByIdAndUpdate(newSubscriber,{$pull:{subscribedUsers:id}})
        await userModel.findByIdAndUpdate(id,{$inc:{subscribers:-1}})
        res.status(200).json('unsubscribe successfully')
    } 
    catch (error) 
    {
        res.json(error)
    }
})

//like video

router.get('/like/:videoID/:userID',async(req,res)=>{
    try 
    {
        let id=req.params.videoID
        let currentUser=req.params.userID
        // let currentUser=req.cookies.userID
        console.log('like',id,currentUser);
        await videoModel.findByIdAndUpdate(id,{$addToSet:{likes:currentUser},$pull:{dislikes:currentUser}})
        res.status(200).json("The video has been liked.")
    } 
    catch (error) 
    {
        res.json(error)
    }
})
//dislike video

router.get('/disLike/:videoID/:userID',async(req,res)=>{
    try 
    {
        let id=req.params.videoID
        let currentUser=req.params.userID
        // let currentUser=req.cookies.userID
        // console.log(id,currentUser);
        await videoModel.findByIdAndUpdate(id,{$addToSet:{dislikes:currentUser},$pull:{likes:currentUser}})
        res.status(200).json("The video has been disliked.")
    } 
    catch (error) 
    {
        res.json(error)
    }
})

//logout

router.get('/logout',async(req,res)=>{
    try 
    {
        // res.status(200).json("The video has been disliked.")
        // console.log('logout called............');
        // res.clearCookie("userID")
        res.clearCookie('userID', {
            sameSite: "none",
            secure: true,
          });
    } 
    catch (error) 
    {
        res.json(error)
    }
})

module.exports=router

