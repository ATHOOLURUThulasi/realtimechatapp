import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

const Chats = () => {
  const [chats, setChats] = useState([]);
  console.log("js", chats);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });
      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({
      type: "CHANGE_USER",
      payload: u
    });
  };

  return (
    <div className='chats'>
      {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat, index) => (
        <div key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
          <div className='userChat'>
            <img src={chat[1].userInfo.photoURL} alt='' style={{ width: "45px", height: "50px", borderRadius: "50%" }} />
            <div className='userChatInfo'>
              <span style={{ color: "black"}}>{chat[1].userInfo.displayName}</span>
              <p style={{ color: "black" }}>{chat[1].lastMessage?.text}</p>
            </div>
          </div>
          {index !== Object.entries(chats).length - 1 && <div className="border-after"></div>}
        </div>
      ))}
    </div>
  );
};

export default Chats;
