import React, { useEffect, useState } from "react";
import moment from 'moment'
import '../css/videoView.css'
import { useNavigate } from "react-router-dom";
import cookie from 'js-cookie'
import HoverVideoPlayer from 'react-hover-video-player';

function RightVideos() {
    let navigate = useNavigate()
    let [randomVideo, setRandomVideo] = useState([])

    // let a = cookie.get('userID')
    // if (!a) {
    //     navigate('/signIn')
    // }

    //fetching random video...........

    useEffect(() => {
        async function fetchRandomVideo() {
            await fetch(`https://y-2-backend.onrender.com/video/random_video`)
                .then((data) => data.json())
                .then((res) => {
                    // console.log(res);
                    setRandomVideo(res)
                })
                .catch((error) => console.log(error))
        }
        fetchRandomVideo()
    }, [])

    return <>
        {/* <div className="v2_container"> */}
        {/* {randomVideo.map((data) =>
            <div className="rightBox" onClick={() => navigate('/videoView', { state: data._id })}>
                <div className="rightVideoBox" style={{ borderRadius: '22px' }}>
                    <video src={data.video_url} style={{ width: '100%', height: '100%', borderRadius: '22px' }}></video>
                </div>
                <div className="rightVideoDetails">
                    <p id="des"><b>{data.describtion}</b></p>
                    <p id="channel">World Affairs <br />{data.video_views} views . {moment(data.createdAt).format('MMM Do, YYYY')}</p> */}
        {/* <p id="view">100k views . 1 mon ago</p> */}
        {/* </div>
            </div>
        )} */}
        {randomVideo.map((data) =>
            <div className="rightBox" onClick={() => navigate('/videoView', { state: data._id })}>
                <div className="rightVideoBox" style={{ borderRadius: '22px' }}>
                    {/* <video src={data.video_url} style={{ width: '100%', height: '100%', borderRadius: '22px' }}></video> */}
                    <HoverVideoPlayer
                           videoSrc={data.video_url} style={{ height: '100%', }}
                           pausedOverlay={
                              <img
                                 src={data.img_url}
                                 alt=""
                                 style={{
                                    // Make the image expand to cover the video's dimensions
                                    width: '100%',
                                    height: '110%',
                                    objectFit: 'cover',
                                 }}
                              />
                           }
                           disableDefaultEventHandling
                           // controls
                        />
                </div>
                <div className="rightVideoDetails">
                    <p id="des"><b>{data.describtion}</b></p>
                    <p id="channel">World Affairs <br />{data.video_views} views . {moment(data.createdAt).format('MMM Do, YYYY')}</p>
                    {/* <p id="view">100k views . 1 mon ago</p> */}
                </div>
            </div>
        )}

        {/* </div> */}
    </>
}

export default RightVideos