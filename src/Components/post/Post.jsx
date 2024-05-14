import "./post.css";
import { MoreVert } from "@mui/icons-material";
import axios from "axios";
import {format} from "timeago.js"
import { useState, useEffect, useContext } from "react";
import{Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext"
function Post({ post }) {
  const {user:currentuser} = useContext(AuthContext)
  const [like, setLike] = useState(post.likes.length); //2
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const likeHandler = () => {
    try{
     axios.put(`http://localhost:4000/api/posts/${post._id}/like`, {userId:  currentuser._id.$oid})
    }catch(err){
        console.log(err)
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  useEffect(()=> {
    setIsLiked(post.likes.includes(currentuser._id.$oid))
  },[currentuser._id.$oid, post.likes]);
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `http://localhost:4000/api/users?userId=${post.userId}`
      );
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  return (
    <>
      <div className="post">
        <div className="postWrapper">
          <div className="postTop">
            <div className="postTopLeft">
              <Link to={`/profile/${user.username}`}  style={{ textDecoration: 'none' }}>
              <img
                src={
                  user.profilePicture ||
                  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIAPoA+gMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAQQFAwIG/9oACAEBAAAAAN8AAAAAAAAAAIAAAACQAAAAAAIFXh4nta6AAACFDO8BNzU9gAAPONWAOmz3AAAxaoAe93oAAFHJAAt7AEoAnA5AAN3sBICvhgAGjpgAFDKAALeyAAZ2YAAWdsAAoZQABb2QCAcMMAA0dMAgDA5gANzuBIBQygALW0AIAYtYAPe50AkAPGPWAPez3ASAEM7P8guanQAEABFTh5d7XUABATSzbWnIApZ1++BKAyKZ7v3esJeadDgWdj0JIGNVA6dvUc+AHbb9EgyqAAABb2JArYgAAAa14DDrgAAB03vQVcUAAADVvkMmkAAABY3A+d8gAAAPoOhwwgAAADYuFXGAAAANPQf/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/9oACgICEAMQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/EADUQAAIBAQUGBAMHBQAAAAAAAAECAwQAESExQBITMDJBUSAiYXEUUoEFEDRCcpKhI2JwgrH/2gAIAQEAAT8A/wAGEhRezADubPWwLle3tY/aB6RD6m3x8vyJYV79Y1stfEeZWWySRycjg6jAAkm4C01cBeIh/sbO7ub2Yk+K+60VbImD+YfzZJEkXaQ3jSsyopZjcozNqipaY3ZJ0HCjkeJtpDcbQTrMt4wIzGkqagzNcOQZcSN2jcMpxFopFlQONFXTbKCIZtn7cakm3clx5W0Ushlkd+549PJvYVY55HQVTbEEnrhoKB8ZE+ugrzdGg7toKI3VA9QRoPtDKL3OgpPxEegrx/SjPZtBRC+oX0B0FUm3A/pjoKBMZH9hoZUMUjJ2PHpo91CinPM6GuhvUSjMZ8akh3soJ5VxOjqYDC2HIcuIiNI4RRibRRLEgQaN0WRSrC8G09O0J7r0PCRHkYKgvNoIFgXuxzOlIBBBF4NpqHrF+02ZWQ3MCD44qOR8X8i/zaOJIl2UF2oZVcXMoIs9DC2RK2NA/SQW+Am+ZLCgk6utloIxzOxtHDFHyIBpZq1Ewj8x79LSTSSm93JtBWMtyyXkd7KyuNpSCOHNWqmEXmPfpYTShy4ka82hrgcJRd6iwIOI4pKqpZjcBmbVFU0vlXBPAjvGb0Yg2jr+kifUWSaKTlceJnROdwvvaSuiXkBY2lqJZeZsOwy8EFQ8J7r2sjpIoZTeOHgASTcBiTapqDM3ZBkOAssqcrsPrYVlQPz3+4t8dUf2ftsa2oP5gPYWaonfOVuBBM0L3jLqLI6yKGU3g8Ktn2julOAz01LPunuJ8jcGqm3MWHM2A1FFNtpsHNf+cCpl3spPQYLqI5DE6uOllIYBhkfFVybuE92wGqoZL0KfL4q59qbY+QaqmfdzIehwPhvAxOQs7F2Zj1JOrifbjR+4HgqW2YJT6Xayha+C7sx8Fb+Gb9S6yg5Zf1D7/wD/xAAUEQEAAAAAAAAAAAAAAAAAAACA/9oACAECAQE/AAB//8QAFBEBAAAAAAAAAAAAAAAAAAAAgP/aAAgBAwEBPwAAf//Z"
                }
                alt=""
                className="postProfileImg"
              />
              </Link>
              
              <span className="postUserName">{user?.username}</span>
              <span className="postDate">{format(post.createdAt)}</span>
            </div>
            <div className="postTopRight">
              <MoreVert />
            </div>
          </div>
          <div className="postCenter">
            <span className="postText">{post.desc}</span>
            <img src={post?.img} alt="" className="postImg" />
          </div>
          <div className="postBottom">
            <div className="postBottomLeft">
              <img
                className="likeIcon"
                src="/src/assets/like.png"
                onClick={likeHandler}
              ></img>
              <img className="likeIcon" onClick={likeHandler} src="/src/assets/heart.png"></img>
              <span className="postLikeCounter">{like} people like it</span>
            </div>
            <div className="postBottomRight">
              <span className="postCommentCounter">
                {post?.comment === 1
                  ? post?.comment + " Comment"
                  : post?.comment + " Comments"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Post;
