import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios.js";

// hamara data    {
// data:{
    // isek andr user ka datat hai 
// }
// }
// hamaar data dat object ke nadr hai axios ek data object retuen karta hai  uske andr sarar response yaani 
// stsusts code data object , message sab hota hai usme se data object me hamara dtata hai isliye 
// data.data return kia hai 

// get user // fetch user 

export const fetchUser  =  createAsyncThunk("/user/fetchUser",async(_,thunkAPI)=>{

    try {
        const {data} =  await axios.get("user/getuser")
        return data.data    // data object axios walal poora json reponse uske andr  hmaar data obj
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch user");
        
    }

});

// register user

export const registerUser = createAsyncThunk("/user/register",async(userdata,thunkAPI)=>{
    try {

        const {data} = await axios.post("/register",userdata);
        return data.data;
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "failed to register User");

        
    }
})


// login user 
export const loginUser  = createAsyncThunk("/user/loginUser",async(credentials,thunkAPI)=>{

    try {
        const {data} = await  axios.post("user/login",credentials);
        return data.data;
        
    } catch (error) {
         return thunkAPI.rejectWithValue(error.response?.data?.message || "login failed");
        
    }

})

// logout User 


export const logoutUser = createAsyncThunk("/user/logout",async(_,thunkAPI)=>{

    try {
        await axios.post("user/logout");
        return true;
        
    } catch (error) {

        return thunkAPI.rejectWithValue(error.response?.data?.message || "logout failed");

        
    }

})


const initialState  ={

    user:null,
    loading:false,
    error:null,
    isAuthenticated:false,
    

}
const userSlice = createSlice({

    name:"user",
    initialState,
    reducers:{},

    extraReducers:(builder)=>{

        // fethc user 

        builder
        .addCase(fetchUser.pending,(state)=>{
            state.loading = true
        })
        .addCase(fetchUser.fulfilled,(state,action)=>{
            state.user = action.payload,
            state.loading=false,
            state.isAuthenticated=true
        })

        .addCase(fetchUser.rejected,(state,action)=>{
            state.error = action.payload
            state.isAuthenticated=false,
            state.loading=false
        })

    //    register case

    .addCase(registerUser.pending,(state)=>{
        state.loading=true
        

    })
    .addCase(registerUser.fulfilled,(state,action)=>{
        state.loading=false,
        state.user=action.payload,
        state.isAuthenticated=true,
        state.error=null
    })
    .addCase(registerUser.rejected,(state,action)=>{
        state.error= action.payload,
        state.loading=false

    })
        // login case 

        .addCase(loginUser.pending,(state)=>{

            state.loading = true

        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.user= action.payload;
            state.isAuthenticated=true,
            state.loading=false

        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.error=action.payload,
            state.loading=false
        })

        // logout


        .addCase(logoutUser.fulfilled,(state)=>{
            state.user=null,
            state.isAuthenticated=false

        })

    }

})


export default userSlice.reducer;