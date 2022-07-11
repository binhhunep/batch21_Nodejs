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
    idObj: "",
  },
  reducers: {
    getPost: (state, action) => {
      return state;
    },
    createPost: async (state, action) => {
      // const newPost = action.payload;
      // return { ...state, data: state.data.push(newPost) };
    },
    updatePost: (state, action) => {
      const idObj = action.payload;
      return { ...state, idObj: idObj };
    },
    deletePost: (state, action) => {
      const idObj = action.payload;
      return { ...state, idObj: idObj };
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
