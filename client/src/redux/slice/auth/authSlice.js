import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as usersApi from "../../../api/services/usersApi";

export const getUsers = createAsyncThunk(
  "slice/getUsers",
  async (params, thunkAPI) => {
    const res = await usersApi.getAllUsers();
    return res;
  }
);

const slice = createSlice({
  name: "getUsers",
  initialState: {
    data: [],
    loading: false,
    error: "",
    username: undefined,
    token: "",
  },
  reducers: {
    getUser: (state, action) => {
      const username = action.payload.data.username;
      const token = action.payload.token;
      return { ...state, username: username, token: token };
    },
  },
  extraReducers: {
    [getUsers.pending]: (state) => {
      state.loading = true;
    },
    [getUsers.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [getUsers.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
  },
});

export default slice;
