import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as postsApi from "../../../api/services/postsApi";

export const getPosts = createAsyncThunk(
  "slice/getPosts",
  async (params, thunkAPI) => {
    const res = await postsApi.getAllPosts(params);
    return res;
  }
);

const slice = createSlice({
  name: "getPosts",
  initialState: {
    data: [],
    loading: false,
    error: "",
  },
  reducers: {
    getPost: (state, action) => {
      return state;
    },
    createPost: (state, action) => {
      const username = action.payload;
      return { ...state, username: username };
    },
    updatePost: (state, action) => {
      const username = action.payload;
      return { ...state, username: username };
    },
    deletePost: (state, action) => {
      const username = action.payload;
      return { ...state, username: username };
    },
  },
  extraReducers: {
    [getPosts.pending]: (state) => {
      state.loading = true;
    },
    [getPosts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [getPosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
  },
});

export default slice;
