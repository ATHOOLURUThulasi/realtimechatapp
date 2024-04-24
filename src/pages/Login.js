import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
  
    // Define default credentials
    const defaultEmail = "thulasi@example.com";
    const defaultPassword = "1234567";
  
    // Check if entered credentials match default credentials
    if (email === defaultEmail && password === defaultPassword) {
      // If they match, proceed with sign-in
      try {
        // You might want to handle Firebase authentication here
        window.alert("Sign in successful!");
        navigate("/home");
      } catch (error) {
        setError("An error occurred while signing in. Please try again.");
      }
    } else {
      // If entered credentials do not match default, proceed with Firebase sign-in
      try {
        await signInWithEmailAndPassword(auth, email, password);
        window.alert("Sign in successful!");
        navigate("/home");
      } catch (error) {
        setError("Invalid email or password. Please try again.");
      }
    }
  };
  
  return (
    <div className="formContainer" style={{backgroundImage:"url('https://images6.alphacoders.com/108/1080642.jpg')",backgroundSize:"cover"}}>
      <div className="formWrapper" style={{ opacity: 0.8}}>
        <span className="logo">TalkSquare</span>
        <span className="title" style={{ fontSize: "15px" }}>Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="email" value="thulasi@gmail.com"/>
          <input type="password" placeholder="password" value="1234567"/>
          <button style={{ backgroundColor: "violet", borderRadius: "20px", padding: "7px", border: "none" }}>Sign in</button>
          {/* email : thulasi@gmail.com<br></br> */}
         {/* <label style={{color:"black",fontSize:"15px"}}>password:</label><input type="ema" value="1234567" style={{border:"none",position:"absolute"}}></input> */}
          {error && <span style={{ color: "red" }}>{error}</span>}
        </form>
        <p style={{fontSize:"15px"}}>You don't have an account? <Link to="/" style={{textDecoration:"none",color:"black"}}>Register</Link></p>
      </div>
    </div>
  );
};

export default Login;
