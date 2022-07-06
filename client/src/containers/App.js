import "./App.scss";
import "antd/dist/antd.less";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "../components/Login/Login";
import Register from "../components/Register/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
