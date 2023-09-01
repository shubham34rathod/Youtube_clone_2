const express=require('express')
const {commentModel,videoModel}=require('../data_base/db')

const router=express.Router()

//add comment

router.post('/addComment',async(req,res)=>{
    try 
    {
        console.log('comment called');
        let userID=req.cookies.userID
        console.log(req.body);
        let newComment=new commentModel({...req.body,userId:userID})
        const savedComment=await newComment.save()
        res.status(200).json(savedComment)
    } 
    catch (error) 
    {
        res.json(error)
    }
})

//delete comment

router.delete('/deleteComment/:id',async(req,res)=>{
    try 
    {
        let userID=req.cookies.userID
        const comment = await commentModel.findById(req.params.id);
        const video = await videoModel.findById(req.params.id);
        if(userID === comment.userId || userID === video.userId) 
        {
            await commentModel.findByIdAndDelete(req.params.id);
            res.status(200).json("The comment has been deleted.");
        } 
        else 
        {
            res.json('You can delete ony your comment!')
        }
    } 
    catch (error) 
    {
        res.json(error)
    }
})

//get comments

router.get('/:videoID',async(req,res)=>{
    try 
    {
        // console.log('get comment called',req.params);
        let comments=await commentModel.find({videoId:req.params.videoID})
        // console.log('fetching',comments);
        res.status(200).json(comments)
    } 
    catch (error) 
    {
        res.json(error)
    }
})

module.exports=router

