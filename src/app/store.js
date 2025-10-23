import { configureStore } from "@reduxjs/toolkit";
import  userReducer from "../features/user/userSlice.js"
import postReducer from  "../features/post/postSlice.js"
import  commentReducer from  "../features/comments/commentSlice.js"



export const store = configureStore({

    reducer:{
        user:userReducer,
        posts:postReducer,
        comment:commentReducer

    }
})
