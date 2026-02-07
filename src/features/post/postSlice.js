// src/features/post/postSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

/* ===================== THUNKS ===================== */

export const getAllPosts = createAsyncThunk(
    "post/getAllPosts",
    async (_, thunkAPI) => {
        try {
            const { data } = await axios.get("post/getallposts");
            return data.data.posts || [];
        } catch (err) {
            return thunkAPI.rejectWithValue("Failed to fetch posts");
        }
    }
);

export const getpostbyauthorId = createAsyncThunk(
    "post/getPostsByAuthor",
    async (authorId, thunkAPI) => {
        try {
            const { data } = await axios.get(`post/${authorId}`);
            return data.data.posts || [];
        } catch (err) {
            return thunkAPI.rejectWithValue("Failed to fetch author posts");
        }
    }
);

export const createPost = createAsyncThunk(
    "post/createPost",
    async (formData, thunkAPI) => {
        try {
            const { data } = await axios.post("post/create", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return data.data;
        } catch (err) {
            return thunkAPI.rejectWithValue("Failed to create post");
        }
    }
);

export const deletePost = createAsyncThunk(
    "post/deletePost",
    async (postId, thunkAPI) => {
        try {
            const { data } = await axios.delete(`post/delete/${postId}`);
            return { postId, message: data.message };
        } catch (err) {
            return thunkAPI.rejectWithValue("Failed to delete post");
        }
    }
);

export const toggleLike = createAsyncThunk(
    "post/toggleLike",
    async (postId, thunkAPI) => {
        try {
            const { data } = await axios.post(`post/like/${postId}`);
            return { postId, ...data.data };
        } catch (err) {
            return thunkAPI.rejectWithValue("Failed to toggle like");
        }
    }
);

export const getPostsByCategory = createAsyncThunk(
    "post/getPostsByCategory",
    async (category, thunkAPI) => {
        try {
            const { data } = await axios.get(`/post/category?category=${category}`);
            return data.data.posts || [];
        } catch (err) {
            return thunkAPI.rejectWithValue("Failed to fetch category posts");
        }
    }
);

export const searchPosts = createAsyncThunk(
    "post/searchPosts",
    async (query, thunkAPI) => {
        try {
            const { data } = await axios.get(`post/search?query=${query}`);
            return data.data.posts || [];
        } catch (err) {
            return thunkAPI.rejectWithValue("Search failed");
        }
    }
);

/* ===================== SLICE ===================== */

const initialState = {
    feedPosts: [],
    profilePosts: [],
    categoryPosts: [],
    searchPosts: [],
    singlePost: null,
    loading: false,
    error: null,
};

const postSlice = createSlice({
    name: "post",
    initialState,

    reducers: {
        clearPostError: (state) => {
            state.error = null;
        },
    },

    extraReducers: (builder) => {
        builder

            /* ===== FEED ===== */
            .addCase(getAllPosts.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.feedPosts = action.payload;
            })
            .addCase(getAllPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            /* ===== PROFILE ===== */
            .addCase(getpostbyauthorId.fulfilled, (state, action) => {
                state.loading = false;
                state.profilePosts = action.payload;
            })

            /* ===== CREATE ===== */
            .addCase(createPost.fulfilled, (state, action) => {
                state.feedPosts.unshift(action.payload);
                state.profilePosts.unshift(action.payload);
            })

            /* ===== DELETE ===== */
            .addCase(deletePost.fulfilled, (state, action) => {
                const id = action.payload.postId;
                state.feedPosts = state.feedPosts.filter(p => p._id !== id);
                state.profilePosts = state.profilePosts.filter(p => p._id !== id);
            })

            /* ===== LIKE ===== */
            .addCase(toggleLike.fulfilled, (state, action) => {
                const { postId, isLiked, likeCount } = action.payload;

                const update = (post) => {
                    if (post._id === postId) {
                        post.isLiked = isLiked;
                        post.likeCount = likeCount;
                    }
                };

                state.feedPosts.forEach(update);
                state.profilePosts.forEach(update);
            })

            /* ===== CATEGORY ===== */
            .addCase(getPostsByCategory.fulfilled, (state, action) => {
                state.categoryPosts = action.payload;
            })

            /* ===== SEARCH ===== */
            .addCase(searchPosts.fulfilled, (state, action) => {
                state.searchPosts = action.payload;
            });
    },
});

export default postSlice.reducer;
