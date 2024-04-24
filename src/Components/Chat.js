import React, { useContext } from "react";
import Cam from "../images/cam.png";
import Add from "../images/add.png";
import More from "../images/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat" style={{backgroundColor:"black",opacity:"0.8"}}>
      <div className="chatInfo" >
        {/* <img src={data.user.photoURL} style={{width:"30px",height:"30px",borderRadius:"50%"}}></img> */}
        <span style={{color:"black"}}>{data.user?.displayName}</span>
        <div className="chatIcons">
          <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div>
      </div>
      <Messages />
      <Input/>
    </div>
  );
};

export default Chat;
