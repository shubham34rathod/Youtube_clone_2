import React, { useEffect, useState } from "react";
import { format } from 'timeago.js'
import '../css/cartPage.css'
import SideBar from "./SideBar";
import { useSelector, useDispatch } from 'react-redux'
import { logotUser } from "./Redux/userSlice";
import cookie from 'js-cookie'
import asphalt from '../video/Asphalt9 - v3.6.3a - DX12 2022-10-03 17-29-07.mp4'
import icon_img from '../images/profile_img.jpg'

import HoverVideoPlayer from 'react-hover-video-player';
import { useNavigate } from "react-router-dom";
import userIcon from '../images/profile_img.jpg'

function CartPage({ type }) {

   let navigate = useNavigate()

   let dispatch = useDispatch()

   let loginStatus = useSelector((state) => state.user.login)
   // console.log('status',loginStatus);
   // if(loginStatus===false)
   // {
   //    navigate('/signIn')
   // }

   // let a=cookie.get('userID')
   // if(!a)
   // {
   //    dispatch(logotUser())
   //    navigate('/signIn')

   // }


   let Cookies = cookie.get('userID')
   // console.log(Cookiee);
   let userName = useSelector((state) => state.user.currentUser)

   let [videos, setVideos] = useState([])

   //getting video for cart page

   useEffect(() => {
      async function fetchVideo() {
         if (type==='sub_video') {
            await fetch(`http://localhost:4000/video/${type}/${Cookies}`)
            // await fetch(`https://y-2-backend.onrender.com/video/${type}/${Cookies}`)
               .then((data) => data.json())
               .then((res) => {
                  console.log(`videois ${type}`, res);
                  setVideos(res)
               })
               .catch((res) => console.log(res))
         }
         else {
            await fetch(`https://y-2-backend.onrender.com/video/${type}`)
               .then((data) => data.json())
               .then((res) => {
                  console.log(`videois ${type}`, res);
                  setVideos(res)
               })
               .catch((res) => console.log(res))
         }
      }
      fetchVideo()
   }, [type])


   // async function addView(video_id)
   // {
   //     await fetch(`/video/update_video/$`)
   // }




   // let toggleValue = useSelector((state) => state.sideBar.value)


   // let videoClip=document.getElementById('videoBox')
   // videoClip.addEventListener('mouseover',(e)=>{
   //    videoClip.play()
   // })
   // videoClip.addEventListener('mouseout',(e)=>{
   //    videoClip.pause()
   // })
   return <>

      {/* {(toggleValue) ? */}

      <div className="parentBox bg-dark">
         {/* style:width=200px */}
         <div style={{ width: '15%' }}><SideBar></SideBar></div>
         <div className="cartBox" style={{ color: 'white' }}>
            {(videos.length===0)? 
               // <h2 style={{fontFamily:'Oswald, sans-serif'}}>No videos</h2> 
                <>
                  <div class="spinner-border" role="status" style={{ margin: '50% 5% 0px 100%' }} >
                     <span class="visually-hidden">Loading...</span>
                  </div>
                  <p style={{ width: '100%', margin: '50% 5% 0px 10%', fontSize: '20px' }}>Loading Please wait. It will take time...........</p>
               </>
               :
               videos.map((data) =>
               <>
                  <div className="carts" onClick={() => {
                     if (loginStatus === false) {
                        alert('Please login')
                        navigate('/signIn')
                     }
                     else {
                        navigate('/videoView', { state: data._id })
                     }
                  }}>
                     {/* <div className="carts" onClick={() => navigate('/videoView',{state:data.userId})}> */}
                     <div className="videoBox">
                        <HoverVideoPlayer
                           videoSrc={data.video_url} style={{ height: '100%', }}
                           pausedOverlay={
                              <img
                                 src={data.img_url}
                                 alt=""
                                 style={{
                                    // Make the image expand to cover the video's dimensions
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                 }}
                              />
                           }
                        // controls
                        />
                     </div>
                     <div className="subContent">
                        <div className="subLogo"><img src={(data.user_profile === '') ? icon_img : data.user_profile} alt="logo" /></div>
                        <div className="subContent_2">
                           <div className="subHeading">{data.describtion}
                              {/* </div> */}
                              <div className="subChaneelName">{data.user_name}</div>
                              <p className="viewCount"><span>{data.video_views} views </span>.&nbsp;&nbsp;&nbsp;<span> {format(data.createdAt)}</span></p>
                           </div>
                        </div>
                     </div>
                  </div>
               </>)
            }
         </div>
      </div>
   </>
}

export default CartPage
