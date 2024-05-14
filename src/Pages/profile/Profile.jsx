import Feed from "../../Components/feed/Feed";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/topbar/Topbar";
import "./profile.css";
import Rightbar from "../../Components/rightbar/Rightbar";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Profile() {
  const {users}=useContext(AuthContext) 
  const params = useParams()
  const username = params.username;
  
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `http://localhost:4000/api/users/?username=${username}`
      );
      setUser(res.data);
    };
    fetchUser();
  }, [username]);
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
                <img src={user.coverPicture || "/src/assets/pol.jpeg"} className="profileCoverImg" alt="" />
                <img src={user.profilePicture || "/src/assets/noAVtar.webp"} className="profileUserImg" alt="" />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{user.username}</h4>
                <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username= {username}/>
            <Rightbar user={user}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
