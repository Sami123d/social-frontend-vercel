import Online from "../online/Online";
import "./rightbar.css";
import { Users } from "../../dummyData";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { Add, Remove } from "@mui/icons-material";
import { AuthContext } from "../../context/AuthContext";
function Rightbar({ user }) {
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(currentUser.followings.includes(user?.id));
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    setFollowed(currentUser.followings.includes(user?._id));
  }, [currentUser, user?._id]);
  useEffect(() => {

    const getFriends = async () => {
      try {
        const friendsList = await axios.get(
          "http://localhost:4000/api/users/friends/" + user._id
        );
        setFriends(friendsList.data);
      } catch (Err) {
        console.log(Err);
      }
    };
    getFriends();
    
  }, [user]);
  const Homerightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img src="/src/assets/gift.png" className="birthdayImg" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 Other friends</b> have a birthday today
          </span>
        </div>
        <img src="/src/assets/ad.png" className="rightbarAd" alt="" />
        <h4>Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((user) => (
            <Online key={user.id} User={user} />
          ))}
        </ul>
      </>
    );
  };
  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`http://localhost:4000/api/users/${user._id}/unfollow`, {
          userId: currentUser._id.$oid,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`http://localhost:4000/api/users/${user._id}/follow`, {
          userId: currentUser._id.$oid,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
    } catch (err) {console.log(err)}
setFollowed(!followed)
  };
  const Profilerightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbarTitle">{}</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "single"
                : user.relationship === 2
                ? "Married"
                : "-"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((frndlist) => (
            <Link
              to={"/profile/" + frndlist.username}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    frndlist.profilePicture
                      ? frndlist.profilePicture
                      : "/src/assets/noAVtar.webp"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">
                  {frndlist.username}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <Profilerightbar /> : <Homerightbar />}
      </div>
    </div>
  );
}

export default Rightbar;
