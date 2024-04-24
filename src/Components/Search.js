import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  console.log("uv",user)
  const [err, setErr] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    setErr(false); // Reset error state

    // Check if username is empty
    if (!username) {
      setUser(null); // Clear user state
      return; // Exit function early
    }

    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        // User not found
        setErr(true);
        setUser(null); // Clear user state if not found
      } else {
        // User found, set user data
        querySnapshot.forEach((doc) => {
          setUser(doc.data());
        });
      }
    } catch (err) {
      // Error occurred while fetching documents
      console.log("Error fetching documents:", err);
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setUsername(value); // Update username state

    // Hide error message when input is cleared
    if (!value) {
      setErr(false);
    }
  };

  const handleSelect = async () => {
    // Check whether the group (chats in firestore) exists, if not create
    if (user) {
      const combinedId =
        currentUser.uid > user.uid
          ? currentUser.uid + user.uid
          : user.uid + currentUser.uid;
      try {
        const res = await getDoc(doc(db, "chats", combinedId));

        if (!res.exists()) {
          // Create a chat in chats collection
          await setDoc(doc(db, "chats", combinedId), { messages: [] });

          // Create user chats
          await updateDoc(doc(db, "userChats", currentUser.uid), {
            [combinedId + ".userInfo"]: {
              uid: user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL,
            },
            [combinedId + ".date"]: serverTimestamp(),
          });

          await updateDoc(doc(db, "userChats", user.uid), {
            [combinedId + ".userInfo"]: {
              uid: currentUser.uid,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL,
            },
            [combinedId + ".date"]: serverTimestamp(),
          });
        }
      } catch (err) {}

      setUser(null);
      setUsername("");
    }
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Search or Find a user"
          onChange={handleChange} // Update to handleChange function
          onKeyDown={handleKey}
          value={username}
          style={{ color: "black" }}
        />
      </div>
      {err && <span>User not found!</span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt="" />
          <div className="userChatInfo">
            <span style={{ color: "black" }}>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
