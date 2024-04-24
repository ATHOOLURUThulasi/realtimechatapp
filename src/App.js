import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./style.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

// import Register from "./pages/Register";
// import Login from "./pages/Login";
// import Home from "./pages/Home";
// import Register from "./pages/Register";

function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children
  };

  return (
    <>
    <BrowserRouter>
      <Routes>
      <Route path="login" element={<Login />} />
          <Route path="/" element={<Register />} />
        <Route path="/home">
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
       
        </Route>
      </Routes>
    </BrowserRouter>
    {/* <Home></Home> */}
    </>
  );
}

export default App;
