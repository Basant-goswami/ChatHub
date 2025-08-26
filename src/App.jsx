import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SingupPage";
import Dashboard from "./Pages/Dashboard";
import ChatPage from "./Pages/ChatPage";
import ProtectedRoute from "./Components/ProtectedRoute";
import Profile from "./Pages/Profile";
import Navbar from "./Components/Navbar";
import About from "./Pages/About";

function App() {
  const location = useLocation();
  const hidePath = ["/login", "/register"].includes(location.pathname);
  return (
    <>
      {!hidePath && <Navbar />}
      <Routes>
        <Route path="/register" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/chats/*" element={<ChatPage />} />
          <Route path="*" element={<LoginPage />} />
        </Route>
        {/* <Route path="/messages/chatroom/:roomId" element={<ChatRoomPage />} /> */}
        {/* <Route path="/messages/*" element={<AllChatRooms />} /> */}
      </Routes>
    </>
  );
}

export default App;
