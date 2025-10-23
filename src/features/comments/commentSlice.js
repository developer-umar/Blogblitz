import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import  axios from  "../../utils/axios.js"

//  Get comments for a post
export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (postId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`comment/${postId}`);
      return res.data.data; // backend me ApiResponse ke andar data hai
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch comments");
    }
  }
);

//  Post a new comment
export const addComment = createAsyncThunk(
  "comments/addComment",
  async ({ postId, message }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`comment/${postId}`, { message });
      return res.data.data; // new comment object return karega
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to post comment");
    }
  }
);

// Delete a comment
export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async (commentId, { rejectWithValue }) => {
    try {
      await axios.delete(`comment/${commentId}`);
      return commentId; // UI se delete karne ke liye id return kar di
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete comment");
    }
  }
);

// Initial State
const initialState = {
  comments: [],
  loading: false,
  error: null,
};

// Slice
const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //Fetch Comments
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Add Comment
    builder
      .addCase(addComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.loading = false;
        // naya comment list ke top pe add kar de
        state.comments.unshift(action.payload);
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    //Delete Comment
    builder
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter((c) => c._id !== action.payload);
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default commentSlice.reducer;
