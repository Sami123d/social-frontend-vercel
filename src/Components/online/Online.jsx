import "./online.css"

function Online({User}) {
  return (
    <li className="rightbarFriend">
    <div className="rightBarProfileImgContainer">
      <img
        src={User?.profilePicture}
        alt=""
        className="rightbarProfileImg"
      />
      <span className="rightbarOnline">.</span>
    </div>
    <span className="rightbarUsername">{User?.username}</span>
  </li>
  )
}

export default Online