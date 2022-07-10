import "./App.scss";
import "antd/dist/antd.less";

import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import Post from "../components/Post/Post";

import * as authSlice from "../redux/slice/auth/authSlice";
import * as postSlice from "../redux/slice/post/postSlice";

import authSelector from "../redux/selector/auth/authSelector";
import postSelector from "../redux/selector/post/postSelector";
function App() {
  const disPatch = useDispatch();
  const auth_Selector = useSelector(authSelector);
  const post_Selector = useSelector(postSelector);
  const [username, setUsername] = useState(undefined);

  useEffect(() => {
    disPatch(authSlice.getUsers());
  }, []);

  useEffect(() => {
    setUsername(auth_Selector.username);
    disPatch(postSlice.getPosts(auth_Selector.token));
  }, [auth_Selector.username]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Post" element={username ? <Post /> : <Login />} />
        <Route path="/Post/create" element={<Post />} />
        <Route path={`/Post/update/`} element={<Post />} />
      </Routes>
    </Router>
  );
}

export default App;
