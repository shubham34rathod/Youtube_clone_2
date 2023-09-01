import {configureStore} from '@reduxjs/toolkit'
import sideBarSlice from '../sideBarSlice'
import userReducer from '../userSlice'
import {persistStore,persistReducer} from 'redux-persist'
import  storage  from 'redux-persist/lib/storage'

const persistConfig={
    key:'iws',
    storage
}
const  persistAuthReducer=persistReducer(persistConfig,userReducer)

export const store=configureStore({
    reducer:{
        sideBar:sideBarSlice,
        user:persistAuthReducer
    }
})

export const persistedStore=persistStore(store)