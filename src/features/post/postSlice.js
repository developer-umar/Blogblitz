import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../utils/axios"


//  async thunk handlers for async operations

// get all posts

export const getAllPosts = createAsyncThunk("/post/getallpost", async (_, thunkAPI) => {

    try {

        const { data } = await axios.get("post/getallposts");
        return data.data.posts



    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch posts");
    }

})


//  create post 

export const createPost = createAsyncThunk("/post/createpost", async (formData, thunkAPI) => {

    try {

        const { data } = await axios.post("post/create", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        })

        return data.data;

    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed  to create posts");

    }
})

// get postbyid or single post

export const getPostById = createAsyncThunk("/post/getpostbyId", async (postId, thunkAPI) => {


    try {

        const { data } = await axios.get(`post/getpost/${postId}`);

        return data.data;


    } catch (error) {

        return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed  to fetch  posts");

    }


})

// delete post by id 

export const deletePost = createAsyncThunk("/post/deletePost", async (postId, thunkAPI) => {


    try {

        const { data } = await axios.delete(`post/delete/${postId}`);
        return { postId, message: data.message }
    } catch (error) {

        return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed  to delete  posts");


    }

})

// toggle likes on post 


export const toggleLike = createAsyncThunk("/post/togglelike", async (postId, thunkAPI) => {

    try {
        const { data } = await axios.post(`post/like/${postId}`)
        return { postId, ...data.data };

    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed  to toggle like");

    }
})


// category filtering 
// backend me rojutes me query btaan eki zaroorat nhi hot wo controllers me direct req.query  object me mil jaata hai express me forntend se ham  category=technology aise query bhej rahe hain

export const getPostsByCategory = createAsyncThunk("/post/getPostsByCategory", async (category, thunkAPI) => {

    try {
        const { data } = await axios.get(`/post/category?category=${category}`);
        return data.data.posts;

    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed  to fetch category posts");


    }



})

// search filter 
export const searchPosts = createAsyncThunk(
    "post/searchPosts",
    async (query, thunkAPI) => {
        try {
            const { data } = await axios.get(`post/search?query=${query}`);
            return data.data.posts;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Search failed"
            );
        }
    }
);







const initialState = {

    posts: [],                //posts 
    singlePost: null,       //single post for edit nulland to see,
    loading: false,
    error: null,
    message: null,

}




const postSlice = createSlice({
    name: "post",
    initialState,

    reducers: {
        clearPostmessage: (state) => {
            state.message = null,
                state.error = null
        }
    },

    extraReducers: (builder) => {


        builder
            // getallposts
            .addCase(getAllPosts.pending, (state) => {
                state.loading = true

            })
            .addCase(getAllPosts.fulfilled, (state, action) => {
                state.loading = false,
                    state.posts = action.payload
            })
            .addCase(getAllPosts.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })

            // createPost

            .addCase(createPost.pending, (state) => {
                state.loading = true
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.loading = false,
                    state.posts.unshift(action.payload)  // newly created post add top pe
                state.message = "post created sucessfully"
            })
            .addCase(createPost.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload

            })

            // get post by Id 

            .addCase(getPostById.pending, (state) => {
                state.loading = true
            })
            .addCase(getPostById.fulfilled, (state, action) => {
                state.loading = false,
                    state.singlePost = action.payload
            })
            .addCase(getPostById.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })

            // delte post

            .addCase(deletePost.pending, (state) => {
                state.loading = true

            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.loading = false,
                state.posts = state.posts.filter((post) => post._id !== action.payload.postId);
                state.message = action.payload.message;
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })

            // toggle like 

            .addCase(toggleLike.pending, (state) => {
                state.loading = true
            })
            .addCase(toggleLike.fulfilled, (state, action) => {
                const { postId, isLiked, likeCount } = action.payload;
                const post = state.posts.find((p) => p._id === postId);
                if (post) {
                    post.likeCount = likeCount;
                    post.isLiked = isLiked;
                }
                // agar singlePost page pr hai to wahan bhi update kar de
                if (state.singlePost && state.singlePost._id === postId) {
                    state.singlePost.likeCount = likeCount;
                    state.singlePost.isLiked = isLiked;
                }
            })

            .addCase(toggleLike.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })

            // getposts by category

            .addCase(getPostsByCategory.pending, (state) => {
                state.loading = true

            })
            .addCase(getPostsByCategory.fulfilled, (state, action) => {
                state.loading = false,
                    state.posts = action.payload

            })
            .addCase(getPostsByCategory.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })
            // search filter  //isme maine count kitne search result  aae wo  do wo nhi derha hai 

            // uske liye ke ra state banna padta ham log ko  count naam ka

            .addCase(searchPosts.pending, (state) => {
                state.loading = true

            })
            .addCase(searchPosts.fulfilled, (state, action) => {
                state.loading = false
                state.posts = action.payload
            })
            .addCase(searchPosts.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload;
            })



    }
})




export default postSlice.reducer;