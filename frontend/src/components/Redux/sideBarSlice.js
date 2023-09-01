import { createSlice } from "@reduxjs/toolkit";

const initialStateValue={
    value:true
}

export const sideBarSlice=createSlice({
    name:'sideBar',
    initialState:initialStateValue,
    reducers:{
        toggleSideBar:(state)=>{
            if(state.value===true)
            {
                state.value=false
            }
            else
            {
                state.value=true
            }
        }
    }
})
export const {toggleSideBar}=sideBarSlice.actions

export default sideBarSlice.reducer