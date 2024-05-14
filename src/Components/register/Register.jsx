import { useRef } from "react";
import "./register.css";
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";
export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();
 
  
  const clickHandler = async(e) => {
    e.preventDefault()
    
    if(password.current.value !== passwordAgain.current.value){
      passwordAgain.current.setCustomValidity("passwords don't match!")
    }else{
      const user = {
        username:username.current.value,
        email:email.current.value,
        password:password.current.value
      }
       try{
     const res = await axios.post("http://localhost:4000/api/auth/register", user)
     navigate("/login");
       console.log("registered")
    }catch(err){
        console.log(err)
    }
    }
   

  }
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Lamasocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={clickHandler}>
            <input placeholder="Username"  required ref={username} className="loginInput" />
            <input placeholder="Email" type="email" required ref={email} className="loginInput" />
            <input placeholder="Password"  required ref={password} className="loginInput" />
            <input placeholder="Password Again"  required ref={passwordAgain} className="loginInput" />
            <button className="loginButton" type="submit" >Sign Up</button>
            <button className="loginRegisterButton">
              <Link to={"/login"} style={{textDecoration: "none", color: "white"}}>
              Log into Account
              </Link>
              
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
