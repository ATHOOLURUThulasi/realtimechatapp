import React, { useState } from "react";
import Add from "../images/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/home");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <div className="formContainer" style={{ 
      backgroundImage: "url('https://img.freepik.com/free-photo/top-view-desk-concept-with-coffee_23-2148604923.jpg')",
      backgroundPosition:"center",
      backgroundSize:"cover",
      boxShadow: "0 4px 8px rgba(0,0,0,0.2)", // Add box shadow here
      borderRadius: "10px", // Add border radius
    }} >
      <div className="formWrapper"  style={{ opacity: 0.7}}>
        <span className="logo" style={{color:"black"}}>TalkSquare</span>
        <span className="title" style={{fontSize:"15px",color:"black"}}>Register</span>
        <form onSubmit={handleSubmit}>
          <input required type="text" placeholder="display name" />
          <input required type="email" placeholder="email" />
          <input required type="password" placeholder="password" />
          <input required style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span style={{color:"black",fontSize:"15px"}}>Add an avatar</span>
          </label>
          <button  style={{backgroundColor:"violet",borderRadius:"10px",padding:"10px",border:"none",cursor:"pointer"}}>Sign up</button>
          {loading && "Uploading and compressing the image please wait..."}
          {err && <span>{window.alert("something went wrong")}</span>}
        </form>
        <p style={{fontSize:"15px"}}>
          You do have an account? <Link to="/login" style={{textDecoration:"none",color:"black"}}>Login</Link>
        </p>
      </div>
    </div>
  )
};

export default Register;
