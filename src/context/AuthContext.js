import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase.js";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log("fff",user);
    });

    return () => {
      unsub();
    };
  }, []);
  console.log("thulasi")
  return (
    <>
  <AuthContext.Provider value={{ currentUser }}>
    {children}
  </AuthContext.Provider>
    </>
  );
};

