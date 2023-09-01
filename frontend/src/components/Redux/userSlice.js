import { createSlice } from "@reduxjs/toolkit";

const stateValue={
    currentUser:null,
    currentVideo:null,
    currentVideoUser:null,
    login:false
}

export const userSlice=createSlice({
    name:'user',
    initialState:stateValue,
    reducers:{
        setUserData:(state,action)=>{
            state.currentUser=action.payload
            state.login=true
            console.log('login status',state.currentUser)
        },
        logotUser:(state)=>{
            // console.log('login status',state.login)
            state.currentUser=null
            state.login=false
            state.currentVideo=null
            state.currentVideoUser=null
            // console.log('login status',state.login)
        },
        setcurrentVideo:(state,action)=>{
            state.currentVideo=action.payload
            // console.log('currentvideo slice',state.currentVideo);
        },
        setcurrentUser:(state,action)=>{
            state.currentVideoUser=action.payload
            // console.log('owner is',state.currentVideo);
            // console.log('owner is',action.payload);
        },
        like:(state,action)=>{
            if(!state.currentVideo.likes.includes(action.payload))
            {
                state.currentVideo.likes.push(action.payload)
                state.currentVideo.dislikes.splice(state.currentVideo.dislikes.findIndex((userId)=>userId===action.payload),1)
            }
        },
        disLike:(state,action)=>{
            if(!state.currentVideo.dislikes.includes(action.payload))
            {
                state.currentVideo.dislikes.push(action.payload)
                state.currentVideo.likes.splice(state.currentVideo.likes.findIndex((userId)=>userId===action.payload),1)
            }
        },
        subscribtion:(state,action)=>{
            if(state.currentUser.subscribedUsers.includes(action.payload))
            {
                state.currentUser.subscribedUsers.splice((state.currentUser.subscribedUsers.findIndex((channelID)=>channelID===action.payload)),1)
                state.currentVideoUser.subscribers=parseInt(state.currentVideoUser.subscribers)-1
            }
            else
            {
                state.currentUser.subscribedUsers.push(action.payload)
                state.currentVideoUser.subscribers=parseInt(state.currentVideoUser.subscribers)+1
            }
        }
    }
})

export const {setUserData,logotUser,setcurrentVideo,setcurrentUser,like,disLike,subscribtion}=userSlice.actions
export default userSlice.reducer