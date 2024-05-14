import "./share.css";
import axios from "axios"
import { PermMedia, Label, Room, EmojiEmotions } from "@mui/icons-material";
import { AuthContext } from "../../context/AuthContext";
import {Link} from  "react-router-dom";
import { useContext, useRef, useState } from "react";
import useUploadImage from "../../../customHook/photos.jsx"
function Share() {
  const [loading, setLoading] = useState(false)
  const {user} = useContext(AuthContext);
  const descr = useRef();
  const [file, setFile] = useState(null);
  const SubmitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: descr.current.value,
      img: file? file : " ",
    }
    try{
      console.log(newPost," (new post)")
      const res  = await axios.post("https://social-backend-vercel.vercel.app/api/posts/", newPost);
      window.location.reload()
      console.log(res.data)
    }catch(err){console.log(err, "ewror")}
  }
  const uploadImg = async (userFileImg) => {
    try {

      console.log("userFileImg", userFileImg);
      setLoading(!loading)
      const imgUrl = await useUploadImage(userFileImg, userFileImg.name)
      setFile(imgUrl)
      console.log(setFile(imgUrl)," img, urlll")

      console.log("file", file);
      setFile(prevUrl => {
        console.log("Updated file state:", prevUrl); // This will log the updated state
        setLoading(false)
        return imgUrl;
      });
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <Link to={`/profile/${user.username}`}>
            <img
            src={user.profilePicture ? user.profilePicture : "/src/assets/noAVtar.webp"}
            alt=""
            className="shareProfileImg"
          />
          </Link>
          
          <input
          ref={descr}
            type="text"
            className="shareInput"
            placeholder={`What's in your mind ${user.username}?`}
          />
        </div>
        <hr className="shareHr" />
        <form className="shareBottom" onSubmit={SubmitHandler}  >
          <div className="shareOptions">
            <label htmlFor="file" style={{cursor: "pointer"}} className="shareOption">
              <PermMedia htmlColor="tomato" />
              <span className="shareOptionText">Photo or video</span>
              <input style={{display: "none"}}type="file" id="file" accept=".png, .jpeg, .jpg" onChange={(e)=> {uploadImg(e.target.files[0])}}/>
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" type={"submit"}>Share</button>
        </form>
      </div>
    </div>
  );
}

export default Share;
