import React, { useState, useEffect, use } from "react";
import API from "../../api";
import { useNavigate, useParams } from "react-router-dom";
import "../assets/css/allChatRooms.css";
import fetchUser from "../assets/Js/Utils";

export default function AllChatRooms({ unreadCounts, onOpenChat }) {
  const [chatroom, setChatroom] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { roomId } = useParams();

  useEffect(() => {
    const getUser = async () => {
      const userData = await fetchUser();
      setUser(userData);
    };
    getUser();
  }, []);

  const userId = user?.id;

  useEffect(() => {
    fetchChatrooms();
  }, [user]);

  const fetchChatrooms = async () => {
    if (!user?.id) return;
    try {
      const response = await API.get(`/chatrooms/user/${userId}`);
      const data = response.data;
      setChatroom(data);
    } catch (error) {
      console.log("Error fetching chatrooms:", error);
    }
  };

  const handleOpenChat = (roomId) => {
    onOpenChat(roomId);
    navigate(`/chats/chatroom/${roomId}`);
    // isSidebarOpen();
  };

  return (
    <div className="chat-room-list bg-light p-3 overflow-auto">
      <ul className="list-group">
        {chatroom.map((room) => (
          <li
            className={`list-group-item list-group-item-action shadow-sm my-1 ${
              parseInt(roomId) === room.id ? "active" : ""
            }`}
            key={room.id}
            role="button"
            onClick={() => handleOpenChat(room.id)}
          >
            <img
              // src={`https://ui-avatars.com/api/?name=${room.name}?background=random`}
              // src={`https://api.dicebear.com/7.x/bottts/svg?seed=https://api.dicebear.com/7.x/bottts/svg?seed=${room.name}`}
              // src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${room.name}`}
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${room.name}`}
              alt={room.name}
              className="rounded-circle me-2"
              width="32"
              height="32"
            />
            {room.name}

            {unreadCounts[room.id] > 0 && (
              // <span className="top-0 start-100 translate-middle badge bg-danger rounded-pill float-end ">
              //   {unreadCounts[room.id]}
              // </span>
              <span className="position-relative">
                <span
                  className=" top-0 start-100 translate-middle badge rounded-pill bg-danger float-end"
                  style={{
                    fontSize: "0.65rem",
                    fontWeight: "700",
                    padding: "0.35rem 0.5rem",
                    boxShadow: "0 2px 8px rgba(220, 53, 69, 0.4)",
                    border: "2px solid #fff",
                    minWidth: "20px",
                  }}
                >
                  {unreadCounts[room.id]}
                </span>
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
