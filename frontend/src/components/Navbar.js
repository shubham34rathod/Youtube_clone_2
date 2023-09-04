import React, { useEffect, useState } from 'react'
import '../css/navBar.css'
import YTicon from '../images/ytIcon.png'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logotUser } from './Redux/userSlice'
import { toggleSideBar } from "./Redux/sideBarSlice";
import tmp_profileImg from '../images/profile_img.jpg'
import cookie from 'js-cookie'
import VideoUpload from './VideoUpload'
import profile_img from '../images/profile_img.jpg'


function Navbar() {

    let navigate = useNavigate()
    let dispatch = useDispatch()
    let loginStatus = useSelector((state) => state.user.login)
    let userName = useSelector((state) => state.user.currentUser)
    // console.log('user name', userName);
    let [settingBtn, setSetting] = useState(false)
    // let [uploadVideo,setVideoBox]=useState(false)
    let [userProfile, setProfile] = useState('')
    let [searchInfo,setSearchInfo]=useState('')

    useEffect(() => {
        // setProfile(userName.profile_img)
        if(loginStatus===true)
        {
            if (userName.profile_img !== '') {
                setProfile(userName.profile_img)
            }
            else {
                setProfile(profile_img)
            }
        }
    }, [userProfile])

    function settingCheck() {
        // console.log('function running');
        if (settingBtn === false) {
            setSetting(true)
        }
        if (settingBtn === true) {
            setSetting(false)
        }
    }

    function getVideo()
    {
        // console.log(searchInfo);
        navigate('/searchVideo',{state:searchInfo})
    }

    // function videoBox()
    // {
    //     if(uploadVideo===false)
    //     {
    //         setVideoBox(true)
    //     }
    //     if(uploadVideo===true)
    //     {
    //         setVideoBox(false)
    //     }
    // }

    async function logOut() {
        console.log('react logout');
        dispatch(logotUser())
        setSetting(false)
        // dispatch(logotUser())
        // cookie.remove('userID')
        fetch('https://y-2-backend.onrender.com/user/logout',{
            method: 'get',
            credentials: 'include'
        })
        .then((data)=>data.json())
        .then((res)=>console.log(res))
        .catch((error)=>console.log(error))

        cookie.remove('userID')
        navigate('/')
    }


    // code for toggle sidebar

    // let [toggleSideBar, setSideBar] = useState(true)
    // let dispatch = useDispatch()
    // let toggleValue = useSelector((state) => state.sideBar.value)

    // function toggle() {
    //     // if (toggleSideBar) {
    //     //     setSideBar(false)
    //     // }
    //     // else {
    //     //     setSideBar(true)
    //     // }
    //     console.log('function called');
    //     dispatch(toggleSideBar())
    //     console.log(toggleValue);
    // }

    return <>

        {/* Navigatin bar.................... */}

        <div className="navigationBox">
            <div className="container-fluid h-100">
                <div className="row bg-dark h-100 p-3">
                    <div className="col-2" id='ytIcon' onClick={() => navigate('/',{state:searchInfo})}>
                        {/* <div className="options" onClick={toggle}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-list " viewBox="0 0 16 16" style={{ color: 'white' }}>
                                <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                            </svg>
                        </div> */}
                        <img src={YTicon} alt="icon" className='ytIcon' /><span className='YTtext'>YouTube Clone</span>
                    </div>

                    <div className="col-8" id='inputBar'>
                        <div className="childSearchBar text-center">
                            <input type="text" placeholder='search' onChange={(e)=>setSearchInfo(e.target.value)}/>
                            <button className='searchBtn' onClick={getVideo}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg></button>
                        </div>
                    </div>
                    <div className="col-2 ">
                        <div className="row">
                            {(loginStatus) ? <>
                                {/* cameraLogo...... */}
                                <div className="col-3 text-white text-center" id="cameraLogo">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-camera-reels my-2" viewBox="0 0 16 16" onClick={() => navigate('/uploadVideo')}>
                                        <path d="M6 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM1 3a2 2 0 1 0 4 0 2 2 0 0 0-4 0z" />
                                        <path d="M9 6h.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 7.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 16H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h7zm6 8.73V7.27l-3.5 1.555v4.35l3.5 1.556zM1 8v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1z" />
                                        <path d="M9 6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM7 3a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                                    </svg>
                                </div>

                                {/* bellIcon...... */}
                                {/* <div className="col-4 text-white text-center " >
                                <button type="button" class="btn btn-dark position-relative"> */}
                                {/* Inbox */}
                                {/* <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-bell" viewBox="0 0 16 16">
                                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                                    </svg>
                                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        99+
                                        <span class="visually-hidden">unread messages</span>
                                    </span>
                                </button>
                            </div> */}

                                {/* profile...... */}
                                <div className="col-3 text-white text-center">
                                    <label htmlFor="uploadProfile">
                                        {/* <svg  xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"  />
                                            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                        </svg> */}
                                        <img className='img-fluid' src={userProfile} alt="image" id='profile_img' />
                                    </label>
                                    <input type="file" accept='image/*' value="" id="uploadProfile" />
                                </div>
                                <div className="col-6 text-white my-1" style={{ overflow: 'hidden' }}>
                                    {/* <h6>{userName.name}</h6> */}
                                    <span className='d-flex'>
                                        <h6>{userName.name}</h6>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical mx-2 my-1" viewBox="0 0 16 16" id="setting" onClick={settingCheck}>
                                            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                        </svg>
                                    </span>
                                </div>
                            </>
                                :
                                <>
                                    {/* signIn button...... */}

                                    <div className='col-12 px-5'>
                                        <button className='btn btn-outline-primary' onClick={() => navigate('/signIn')}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16" style={{ margin: '5px' }}>
                                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                            </svg>
                                            SIGN IN
                                        </button>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* logout window */}
        {settingBtn &&
            <div className="settingBox" style={{ color: 'white' }}>
                <div className="userImgBox">
                    <img className='img-fluid' src={userProfile} alt="profile_img" id="profile_img" />
                </div>
                <h6 className='my-2' style={{ textAlign: 'center' }}>{userName.name}</h6>
                <div id="logoutBox">
                    <button id='logoutBtn' onClick={logOut}>Logout</button>
                </div>
            </div>
        }

        {/* video upload */}
        {/* {uploadVideo &&  <VideoUpload></VideoUpload>} */}

        <Outlet></Outlet>
    </>
}

export default Navbar