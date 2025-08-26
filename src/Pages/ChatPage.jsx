import React, { useEffect, useState } from "react";
import AllChatRooms from "./AllChatRooms";
import ChatWindow from "./ChatWindow";
import { Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function ChatPage() {
  // const [sideBarOpen, setSideBarOpen] = useState(false);
  const location = useLocation();
  const isChatRoomPage = location.pathname.includes("/chats/chatroom/");
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  const [unreadCounts, setUnreadCounts] = useState({}); // roomId -> count

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Reset unread count when opening a room
  const handleOpenChat = (roomId) => {
    setUnreadCounts((prev) => ({ ...prev, [roomId]: 0 }));
  };

  // Increment count when new msg arrives (and not in active room)
  const handleNewMessage = (roomId) => {
    if (!location.pathname.includes(`/chats/chatroom/${roomId}`)) {
      setUnreadCounts((prev) => ({
        ...prev,
        [roomId]: (prev[roomId] || 0) + 1,
      }));
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row h-100">
          {(isDesktop || !isChatRoomPage) && (
            <div className="col-12 col-md-4 border-end overflow-auto">
              <AllChatRooms
                unreadCounts={unreadCounts}
                onOpenChat={handleOpenChat}
              />
              {/* isSidebarOpen={() => setSideBarOpen(false)} */}
            </div>
          )}

          {(isDesktop || isChatRoomPage) && (
            <div className="col-12 col-md-8 p-0">
              <Routes>
                <Route
                  path="chatroom/:roomId"
                  element={<ChatWindow onNewMessage={handleNewMessage} />}
                />
              </Routes>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
