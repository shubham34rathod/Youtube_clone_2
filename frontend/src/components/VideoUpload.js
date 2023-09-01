import React, { useEffect, useState } from "react";
import '../css/videoUpload.css'
import SideBar from "./SideBar";
import { useSelector } from "react-redux";
import cookie from 'js-cookie'
import { useNavigate } from "react-router-dom";

function VideoUpload() {
    let navigate = useNavigate()

    let userID = useSelector((state) => state.user.currentUser)

    // let a = cookie.get('userID')
    // if (!a) {
    //     navigate('/signIn')
    // }

    let [videoData, setVideoData] = useState({
        user_name: '',
        user_profile: '',
        video_url: '',
        title: '',
        describtion: '',
        tags: '',
        img_url: ''
    })

    useEffect(() => {
        setVideoData((data) => ({
            ...data,
            user_name: userID.name,
            user_profile: userID.profile_img
        }))
    }, [])

    let [v_spinner, setSpinner_v] = useState(false)
    let [i_spinner, setSpinner_i] = useState(false)
    let [v_rightMark, setMark_v] = useState(false)
    let [i_rightMark, setMark_i] = useState(false)
    // let [toggleBtn, setToggleBtn] = useState(false)

    async function uploadToCloud(prop, e) {
        if (prop === 'video_url') {
            setSpinner_v(true)
            let videoFile = e.target.files[0]
            let data1 = new FormData()
            data1.append('file', videoFile)
            data1.append('upload_preset', 'video_YT')
            await fetch('https://api.cloudinary.com/v1_1/df78wetic/video/upload', {
                method: 'POST',
                body: data1
            },)
                .then((data) => data.json())
                .then((res) => {
                    setSpinner_v(false)
                    setMark_v(true)
                    console.log(res);
                    setVideoData((data) => ({
                        ...data,
                        video_url: res.secure_url
                    }))
                })
        }
        if (prop === 'img_url') {
            setSpinner_i(true)
            let imageFile = e.target.files[0]
            let data2 = new FormData()
            data2.append('file', imageFile)
            data2.append('upload_preset', 'video_YT')
            await fetch('https://api.cloudinary.com/v1_1/df78wetic/image/upload', {
                method: 'POST',
                body: data2
            })
                .then((data) => data.json())
                .then((res) => {
                    setSpinner_i(false)
                    setMark_i(true)
                    // console.log(res);
                    setVideoData((data) => ({
                        ...data,
                        img_url: res.secure_url
                    }))
                })
        }
    }

    function setData(prop, e) {
        setVideoData((data) => ({
            ...data,
            [prop]: e.target.value
        }))
    }

    async function submitData() {
        // console.log(videoData);
        console.log(userID._id);
        await fetch(`https://y-2-backend.onrender.com/video/addVideo/${userID._id}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(videoData)
        })
            .then((data) => data.json())
            .then((res) => {
                console.log(res)
                if (res === 'new video create') {
                    setVideoData({
                        video_url: '',
                        title: '',
                        describtion: '',
                        tags: '',
                        img_url: ''
                    })
                }
            })
            .catch(() => console.log('error'))
    }

    // useEffect(() => {
    //     if (videoData.video_url !== '' && videoData.title !== '') {
    //         setToggleBtn(true)
    //     }
    // }, [toggleBtn])

    return <>

        <div className="parentUploadBox">
            <div><SideBar></SideBar></div>
            <div className="childParentUpload bg-dark">
                <div className="uploadBox">
                    {/* <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16"  style={{ float: 'right', margin: '5px 5px 0px 0px' }}>
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                    </div> */}
                    <h2 className='uploadTitle'>Upload new video</h2>
                    <form>
                        <div>
                            <label htmlFor="upload">Upload video :</label>
                            <span>
                                {v_spinner &&
                                    <div class="spinner-border text-primary mx-3" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                }
                                {v_rightMark &&
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-check-lg mx-3" viewBox="0 0 16 16" style={{ color: 'green' }}>
                                        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                                    </svg>
                                }
                            </span><br />
                            <input type="file" id="upload" accept="video/*" name="video_url" onChange={(e) => uploadToCloud('video_url', e)} />
                        </div>
                        <div>
                            <input type="text" placeholder="title" name="title" value={videoData.title} onChange={(e) => setData('title', e)} style={{ color: 'white' }} />
                        </div>
                        <div>
                            <textarea name="describtion" id="describtion" cols="59" rows="8" placeholder="describtion" value={videoData.describtion} onChange={(e) => setData('describtion', e)} style={{ color: 'white' }}></textarea>
                        </div>
                        <div>
                            <input type="text" placeholder="Tags saperated by commas" name="tags" id="tags" value={videoData.tags} onChange={(e) => setData('tags', e)} style={{ color: 'white' }} />
                        </div>
                        <div>
                            <label htmlFor="image">img_url :</label>
                            <span>
                                <span>
                                    {i_spinner &&
                                        <div class="spinner-border text-primary mx-3" role="status">
                                            <span class="visually-hidden">Loading...</span>
                                        </div>
                                    }
                                    {i_rightMark &&
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-check-lg mx-3" viewBox="0 0 16 16" style={{ color: 'green' }}>
                                            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                                        </svg>
                                    }
                                </span>
                            </span>
                            <input type="file" name="image" id="image" accept="image/*" onChange={(e) => uploadToCloud('img_url', e)} />
                        </div>
                        {/* <button id="uploadVideoBtn" disabled={false}>Upload</button> */}
                        <div class="d-grid gap-2">
                            <button class="btn btn-primary" type="button" id="liveToastBtn" onClick={submitData}>Submit</button>
                            { }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
}

export default VideoUpload