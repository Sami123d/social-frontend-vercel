import { CircularProgress } from "@mui/material";
import "./forgot.css";
import React, { useRef, useState } from 'react'
import {  useNavigate } from "react-router-dom";
import { Password } from "@mui/icons-material";
import axios from "axios";
// $2b$10$MtMsCbyBtjX5aD7qjhtJteJKThy0HYK1xBqU3J17IACoF8cp1XWa.
function Forgot() {
    const email =useRef();
    const forgotPass = useRef();
   const navigate = useNavigate();
   
    const forgotHandler = async(e)=>{
        e.preventDefault()
        const values = {
            email: email.current.value,
            password: forgotPass.current.value,
            
         }
   try{
     const res = await axios.post("http://localhost:4000/api/auth/forgot-password", values)
    console.log("forgot sucessfully")

     navigate("/login")
   }catch(err){
         console.log(err)
   }
    }
  return (
    <div className="forgot">
      <div className="forgotWrapper">
        <div className="forgotLeft">
          <h2 className="forgotLogo"> Lamasocial</h2>
          <span className="forgotDesc">
            Connect with friends and the world around you using Lamasocial
          </span>
        </div>
        <div className="forgotRight">
          <form className="forgotBox" onSubmit={forgotHandler}>
            <input
              placeholder="Email"
              ref={email}
              required
              type="email"
              className="forgotInput"
            />
            <input
              placeholder="Forgot Password"
             ref={forgotPass}
              minLength="4"
              required
              type="password"
              className="forgotInput"
            />
            
            <button className="forgotRegisterButton" type="submit">
              
                  Forgot Password
            
         
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Forgot