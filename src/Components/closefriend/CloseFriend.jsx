import "./closefriend.css";

function CloseFriend({User}) {
  return (
    <div className="sidebarFriend">
      <img
        src={User?.profilePicture}
        alt=""
        className="sidebarFriendImg"
      />
      <span className="sidebarFriendName">{User?.username}</span>
    </div>
  );
}

export default CloseFriend;
