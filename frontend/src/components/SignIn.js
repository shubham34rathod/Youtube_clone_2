import React, { useState } from "react";
// import axios from 'axios'
import { Outlet, useNavigate } from "react-router-dom";
// import { UseSelector,useDispatch } from "react-reduxr";
import {useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUserData } from "./Redux/userSlice";
import '../css/signIn.css'
import SideBar from "./SideBar";

function SignIn() {

    let dispatch=useDispatch()
    let userInfo=useSelector((state)=>state.user._id)
    let navigate=useNavigate()

    let [v_spinner, setSpinner_v] = useState(false)
    let [v_rightMark, setMark_v] = useState(false)
    let [btnStatus,setBtn]=useState(true)

    let [signIn, setSigin] = useState({
        name: '',
        password: ''
    })

    let [signUp, setSignup] = useState({
        name: '',
        email: '',
        password: '',
        profile_img:''
    })

    function setSigninData(e, prop) 
    {
        setSigin((data) => ({
            ...data,
            [prop]: e.target.value
        }))
    }

    function setSignupData(e, prop) 
    {
        setSignup((data) => ({
            ...data,
            [prop]: e.target.value
        }))
    }
    function submit(e,type) 
    {
        e.preventDefault()
        if (type === 'signIn') {
            fetch('/user/signIn', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(signIn),
                // credentials:'include'
            })
            .then((res)=>res.json())
            .then((data)=>{
                console.log(data);
                if(data[1]==='login successfull')
                {
                    dispatch(setUserData(data[0]))
                    // console.log(userInfo);
                    navigate('/')
                }
            })
            .catch(()=>console.log('signIn fetching error'))
        }
        if (type === 'signUp') {
            fetch('/user/signUp', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(signUp)
            })
            .then((res)=>res.json())
            .then((data)=>{
                console.log(data);
                if(data.code===11000)
                {
                    console.log('true');
                }
                if(data==='user has been created')
                {
                    setSignup({
                        name: '',
                        email: '',
                        password: ''
                    })
                }
            })
            .catch(()=>console.log('signUp fetching error'))
        }
        // console.log(signUp);
    }

    //uploading profile image............

    async function profileUpload(e,prop)
    {
        setSpinner_v(true)
        let imageFile = e.target.files[0]
        let data2 = new FormData()
        data2.append('file', imageFile)
        data2.append('upload_preset', 'Profile_YT')
        await fetch('https://api.cloudinary.com/v1_1/df78wetic/image/upload', {
            method: 'POST',
            body: data2
        })
            .then((data) => data.json())
            .then((res) => {
                // console.log(res);
                setMark_v(true)
                setBtn(false)
                setSpinner_v(false)
                setSignup((data) => ({
                    ...data,
                    profile_img: res.secure_url
                }))
            })
    }

    return <>
        <div className="signIn_parentBox">
            {/* <div><SideBar></SideBar></div> */}
            <div className="signIn_mainBox">
                <div className="child_box" style={{ color: 'white' }}>
                    <form onSubmit={(e)=>submit(e,'signIn')}>
                        <p className="signIn_txt"><h5>Sign In</h5> <br /> to continue to YouTube clone</p>
                        <input type="text" placeholder="username" value={signIn.name} name="name" onChange={(e) => setSigninData(e, 'name')} /><br />
                        <input type="password" placeholder="password" value={signIn.password} name="password" onChange={(e) => setSigninData(e, 'password')} /><br />
                        <button className="btn btn-outline-dark" id='signInBtn'>Sign in</button>
                    </form>
                    <h6 className="my-3">Or</h6>
                    <form onSubmit={(e)=>submit(e,'signUp')}>
                        <input type="text" placeholder="username" value={signUp.name} name="name" onChange={(e) => setSignupData(e, 'name')} /><br />
                        <input type="email" placeholder="email" value={signUp.email} name="email" onChange={(e) => setSignupData(e, 'email')} />
                        <input type="password" placeholder="password" value={signUp.password} name="password" onChange={(e) => setSignupData(e, 'password')} /><br />
                        <label htmlFor="">Upload profile image</label>
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
                        <input type="file" accept="image/*"  name="profile_img"  onChange={(e)=>profileUpload(e,'profile_img')}/><br />
                        <button type="submit" className="btn btn-outline-dark" id='signInBtn' disabled={btnStatus}>Sign up</button>
                    </form>
                </div>
            </div>
        </div>
        <Outlet></Outlet>
    </>
}

export default SignIn