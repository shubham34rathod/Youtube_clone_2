const express=require('express')
const { videoModel, userModel } = require('../data_base/db')

const router=express.Router()

//create video

router.post('/addVideo/:id',async(req,res)=>{
    try 
    {
        // console.log(req.body);
        let id=req.params.id
        // console.log(req.body)
        let newVideo=await videoModel({userId:id,...req.body})
        await newVideo.save()
        res.status(200).json('new video create')
    } 
    catch (error) 
    {
        res.json('error server')
    }
})

//update video

router.put('update_video/:id',async(req,res)=>{
    try 
    {
        // let id=req.params.id
        let video=await videoModel.findById(id)
        if(!video)
        {
            res.json('you can update your video only')
        }
        else
        {
            let updatedVideo=await videoModel(id,{$set:req.body},{new:true})
            res.status(200).json('video updated')
        }
    } 
    catch (error) 
    {
        res.json(error)
    }
})

//delete video

router.delete('/delete_video/:id',async(req,res)=>{
    try 
    {
        let id=req.params.id
        let video=await videoModel.findById(id)
        if(!video)
        {
            res.json('you can delete your video only')
        }
        else
        {
            await videoModel.findByIdAndDelete(id)
            res.status(200).json('video has been deleted')
        }
    } 
    catch (error) 
    {
        res.json(error)
    }
})

//get video

router.get('/video/:id',async(req,res)=>{
    try 
    {
        // console.log(req.params.id);
        let id=req.params.id
        let video=await videoModel.findById(id)
        res.status(200).json(video)
    } 
    catch (error) 
    {
        res.json(error)
    }
})

//views

router.get('/addView/:id',async (req,res)=>{
    try 
    {
        let id=req.params.id
        // console.log(id);
        // console.log(req.params);
        await videoModel.findByIdAndUpdate(id,{$inc:{video_views:1}})
        res.status(200).json('view has been increased')
    } 
    catch (error) 
    {
        res.json(error)
    }
})

//trend videos

router.get('/trend_video',async(req,res)=>{
    try 
    {
        // console.log('trend called');
        let videos=await videoModel.find().sort({video_views:-1})
        res.status(200).json(videos)
    } 
    catch (error) 
    {
        res.json(error)
    }
})

//random videos

router.get('/random_video',async(req,res)=>{
    try 
    {
        // console.log('random called');
        // console.log('uid is',req.cookies);
        let vidoe=await videoModel.aggregate([{$sample:{size:40}}])
        res.status(200).json(vidoe)
    } 
    catch (error) 
    {
        res.json(error)
    }
})

//subscribe video

router.get('/sub_video/:userID',async(req,res)=>{
    try 
    {
        // console.log('sub called');
        // let id=req.cookies
        let id=req.params.userID
        // console.log(id.userID);
        let user=await userModel.findById(id)
        let subscribe_chaneels=user.subscribedUsers
        // console.log('test',subscribe_chaneels);

        let list=await Promise.all(
            subscribe_chaneels.map(async(channelId)=>{
                return await videoModel.find({userId:channelId})
            })
        )
        res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
    } 
    catch (error) 
    {
        res.json(error)
    }
})

//tags

router.get('/byTag',async(req,res)=>{
    try 
    {
        let tags=req.query.tags.split(",")
        let video=await videoModel.find({tags:{$in:tags}}).limit(20)
        res.status(200).json(video)
    } 
    catch (error) 
    {
        res.json(error)
    }
})

//search video

router.get('/search_video/:str',async(req,res)=>{
    try 
    {
        let query=req.params.str
        // console.log(query);
        let video=await videoModel.find({title:{$regex:query,$options:"i"}}).limit(40)
        res.status(200).json(video)
    } 
    catch (error) 
    {
        res.json(error)
    }
})

module.exports=router