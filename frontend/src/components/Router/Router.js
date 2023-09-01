import React from "react";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Navbar from "../Navbar";
import CartPage from "../CartPage";
import VideoView from "../VideoView";
import SignIn from "../SignIn";
import VideoUpload from "../VideoUpload";
import SearchVideo from "../SearchVideo";

function Router()
{
    return <>
       <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navbar></Navbar>}>
               <Route path="/" element={<CartPage type='random_video'></CartPage>}></Route> 
               <Route path="/trends" element={<CartPage type='trend_video'></CartPage>}></Route>
               <Route path="/subscriptions" element={<CartPage type='sub_video'></CartPage>}></Route>
               <Route path="/videoView" element={<VideoView></VideoView>}></Route>
               <Route path="/signIn" element={<SignIn></SignIn>}></Route>
               <Route path="/uploadVideo" element={<VideoUpload></VideoUpload>}></Route>
               <Route path="/searchVideo" element={<SearchVideo></SearchVideo>}></Route>
            </Route>
          </Routes>
       </BrowserRouter>
    </>
}
export default Router