import React from "react";
import { Routes, Route } from "react-router-dom";
import Start from "./pages/Start";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Captainlogin from "./pages/Captainlogin";
import Home from "./pages/Home";
import Captainsignup from "./pages/Captainsignup";
import UserProtectedWraper from "./pages/UserProtectedWraper";
import UserLogout from "./pages/UserLogout";
import CaptainHome from "./pages/CaptainHome";
import CaptainProtectedWraper from "./pages/CaptainProtectedWrapper";
import Riding from "./pages/Riding";
import CaptainLogout from "./pages/CaptainLogout";
import CaptainRiding from "./pages/CaptainRiding";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/riding" element={<Riding/>} /> 
        <Route path="/captain-riding" element={<CaptainRiding/>} /> 
        <Route path="/captain-login" element={<Captainlogin />} />
        <Route path="/captain-signup" element={<Captainsignup />} />
        <Route path="/home" element={
          <UserProtectedWraper>
          <Home />
          </UserProtectedWraper>
          } />
          <Route path="/user/logout" element={
            <UserProtectedWraper>
              <UserLogout/>
            </UserProtectedWraper>
          }/>
          <Route path="/captain/logout" element={
            <UserProtectedWraper>
              <CaptainLogout/>
            </UserProtectedWraper>
          }/>
          <Route path="/captain-home" element={
            <CaptainProtectedWraper>
            <CaptainHome/>
            </CaptainProtectedWraper>
            }/>
      </Routes>
    </div>
  );
};

export default App;
