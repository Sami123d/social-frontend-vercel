import React, { useContext } from "react";
import Home from "./Pages/homess/Home";
import "./app.css";
import Profile from "./Pages/profile/Profile";
import Login from "./Components/login/Login";
import Register from "./Components/register/Register";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; // Update import statemen
import { AuthContext } from "./context/AuthContext";
import Forgot from "/src/Components/forgotPassword/Forgot.jsx";

function App() {
  const {user} = useContext(AuthContext)
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={user ? <Home/> : <Register/>}/>
        <Route  path="/login" element={user ? <Navigate to="/"/> : <Login/>}/>
        <Route  path="/register" element={user ? <Navigate to="/"/> : <Register/>}/>
        <Route  path="/profile/:username" element={<Profile/>}/>
        <Route  path="/forgot-password" element={<Forgot/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
