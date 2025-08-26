import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useRef, React } from "react";
import { Fragment } from "react";
import API from "../../api";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import calendar from "dayjs/plugin/calendar";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import "../assets/css/chatWindow.css";
import fetchUser from "../assets/Js/Utils";

export default function ChatWindow({ onNewMessage }) {
  dayjs.extend(isSameOrBefore);
  dayjs.extend(isSameOrAfter);
  dayjs.extend(calendar);

  let lastDate = null;

  const [messages, setMessages] = useState([]);
  const [inputMsg, setInputMsg] = useState("");
  const [roomInfo, setRoomInfo] = useState(null);
  const [user, setUser] = useState(null);
  const roomId = useParams().roomId;

  const navigate = useNavigate();
  const chatBoxRef = useRef(null);
  const stompClientRef = useRef(null);

  useEffect(() => {
    const getUser = async () => {
      const userData = await fetchUser();
      setUser(userData);
      if (!userData) {
        navigate("/login");
      }
    };
    getUser();
  }, []);

  const userName = user?.userName;

  // Fetch room info
  const fetchRoomInfo = async () => {
    try {
      const response = await API.get(`/chatrooms/${roomId}`);
      setRoomInfo(response.data);
      // console.log("Room Info:", roomInfo);
    } catch (error) {
      console.error("Error fetching room info", error);
    }
  };

  const fetchMessages = async () => {
    const response = await API.get(`/messages/chatroom/${roomId}`);
    setMessages(response.data);
    // console.log(response.data);
  };

  // WebSocket connection
  const connectSocket = () => {
    const socket = new SockJS(`${import.meta.env.VITE_API_BASE_URL}/ws`);
    const stompClient = over(socket);

    // Disable debug logs
    stompClient.debug = () => {};

    stompClient.connect({}, () => {
      // Presence tracking
      stompClient.send("/app/presence", {}, JSON.stringify({ online: true }));
      stompClient.subscribe("/topic/status", (message) => {
        const data = JSON.parse(message.body);
        console.log("Presence update:", data);
      });

      stompClient.subscribe("/topic/public", (message) => {
        const msg = JSON.parse(message.body);

        if (msg.chatRoomId === parseInt(roomId)) {
          setMessages((prevMessages) => {
            const existingIndex = prevMessages.findIndex(
              (m) => m.id === msg.id
            );

            if (existingIndex !== -1) {
              const updatedMessages = [...prevMessages];
              updatedMessages[existingIndex] = msg;
              return updatedMessages;
            }

            // Mark as delivered (for receiver only)
            if (msg.sender !== userName) {
              API.put(`/messages/${msg.id}/status`, { status: "delivered" });
            }
            return [...prevMessages, msg];

            return prevMessages;
          });
        } else {
          // Notify parent about unread msg in another room
          onNewMessage?.(msg.chatRoomId);
        }
      });
    });

    stompClientRef.current = stompClient;
  };

  // Send message function
  const sendMessage = () => {
    if (stompClientRef.current && inputMsg.trim() !== "") {
      const msgPayload = {
        content: inputMsg,
        sender: userName,
        chatRoomId: parseInt(roomId),
        timestamp: new Date().toISOString(),
      };

      stompClientRef.current.send(
        "/app/chat.sendMessage",
        {},
        JSON.stringify(msgPayload)
      );
      setInputMsg(""); // Clear input after sending
    }
  };

  useEffect(() => {
    if (messages.length > 0) {
      const unseenMsgs = messages.filter(
        (msg) => msg.sender !== userName && msg.status !== "seen"
      );

      unseenMsgs.forEach((msg) => {
        API.put(`/messages/${msg.id}/status`, { status: "seen" });
      });
    }
  }, [messages]);

  // Cleanup on component unmount
  useEffect(() => {
    if (!user) return;
    fetchRoomInfo();
    connectSocket();
    fetchMessages();

    return () => {
      if (stompClientRef.current && stompClientRef.current.connected) {
        stompClientRef.current.send(
          "/app/presence",
          {},
          JSON.stringify({ online: false })
        );
        stompClientRef.current.disconnect(() => {
          // console.log("Disconnected from WebSocket");
        });
      }
    };
  }, [roomId, user]);

  useEffect(() => {
    chatBoxRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="chat-container container">
        <div className="chat-header d-flex align-items-center justify-content-between p-2 border-bottom bg-white">
          {/* Back Button (only on small screens) */}
          <button
            className="btn btn-outline-secondary d-md-none border-0 m-0 p-0"
            onClick={() => navigate("/chats")}
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>

          {/* Chat Title */}
          <h6 className="mb-0 mx-3 text-truncate flex-grow-1">
            {roomInfo ? roomInfo.name : "Loading..."}
          </h6>
        </div>

        <div className="chat-box">
          {messages.map((msg, index) => {
            const msgDate = dayjs(msg.msgAt || msg.timestamp).format(
              "DD MMM YYYY"
            );
            const messageDateSeprator = msgDate !== lastDate;
            lastDate = msgDate;
            const isSender =
              msg.sender?.userName === userName || msg.sender === userName;
            return (
              <Fragment key={index}>
                {messageDateSeprator && (
                  <div className="message-date-separator">
                    <span>{msgDate}</span>
                  </div>
                )}
                <div
                  key={index}
                  className={`chat-message ${isSender ? "own" : "other"}`}
                >
                  <div className="chat-bubble">
                    <strong className="sender">
                      {typeof msg.sender === "object"
                        ? msg.sender.userName
                        : msg.sender}
                    </strong>
                    <div>{msg.msg || msg.content}</div>
                    <div className="message-meta">
                      <span
                        className="timestamp"
                        style={{ fontSize: "12px", color: "#888" }}
                      >
                        {msg.timestamp || msg.msgAt
                          ? dayjs(msg.timestamp || msg.msgAt).format("HH:mm A")
                          : ""}
                      </span>
                      {isSender && (
                        <span className="status-icon">
                          {msg.status === "SENT" && (
                            <i
                              className="fa fa-check"
                              style={{ color: "#888" }}
                            ></i>
                          )}
                          {msg.status === "DELIVERED" && (
                            // "✔✔"
                            <i
                              className="fa fa-check-double"
                              style={{ color: "#333" }}
                            ></i>
                          )}
                          {msg.status === "SEEN" && (
                            <i
                              className="fa fa-check-double"
                              style={{ color: "#4fc3f7" }}
                            ></i>
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Fragment>
            );
          })}
          <div ref={chatBoxRef}></div>
        </div>

        <div className="chat-input">
          <input
            type="text"
            placeholder="Type a message..."
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
          />
          <button onClick={sendMessage} className="btn btn-primary border-0">
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </>
  );
}
