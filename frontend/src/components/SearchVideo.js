import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import '../css/searchVideo.css'
import HoverVideoPlayer from 'react-hover-video-player';
import tmpVideo from '../video/endgame.mp4'
import tmpImg from '../images/asphalt_9.jpg'
import { useLocation, useNavigate } from "react-router-dom";
// import { get } from "../../../backend/routes/video";
import moment from 'moment'
import cookie from 'js-cookie'

function SearchVideo() {

    let navigate = useNavigate()

    let a = cookie.get('userID')
    if (!a) {
        navigate('/signIn')
    }

    let location = useLocation()
    console.log('loc', location.state);

    let [videoData, setVideoData] = useState([])

    useEffect(() => {
        async function getVideo() {
            await fetch(`/video/search_video/${location.state}`)
                .then((data) => data.json())
                .then((res) => {
                    // console.log('res',res);
                    setVideoData(res)
                })
                .catch((error) => console.log(error))
        }
        getVideo()
    }, [])

    return <>
        <div className="searchParenBox">
            <div className="sidebar_100">
                <SideBar></SideBar>
            </div>
            <div className="seacrchChildBox bg-dark">
                {videoData.map((data) =>
                    <div className='sub_child' onClick={() => navigate('/videoView', { state: data._id })}>
                        <div className="fitVideo">
                            <HoverVideoPlayer
                                videoSrc={data.video_url} style={{ width: '100%', margin: 'auto' }}
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
                            />
                        </div>
                        <div className="video_detail">
                            <p className="video_dec">{data.describtion}</p>
                            <p style={{ color: 'rgb(140, 140, 140)' }}>{data.video_views} views . {moment(data.createAt).format('MMM Do, YYYY')}</p>
                            <div className="user_detail">
                                <div className="img_div"><img src={data.user_profile} className="" alt="" /></div>
                                <p className="px-3 user_name"><b>{data.user_name}</b></p>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    </>
}

export default SearchVideo