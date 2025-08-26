import React, { useEffect, useState, useRef } from "react";
import API from "../../api";
import "../assets/css/PrivateChatCss.css";

export default function PrivateChatRoom({ user, onClose, onSuccess }) {
  const [selectedUserName, setSelectedUserName] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [showUserList, setShowUserList] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    API.get("/api/auth/users").then((res) => {
      const filteredUsers = res.data.filter((u) => u.id !== user.id);
      setAllUsers(filteredUsers);
    });
  }, [user.id]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowUserList(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (userId, userName) => {
    setSelectedUser(userId);
    setSelectedUserName(userName);
    setShowUserList(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUser) return;
    const payload = {
      name: `${user.userName} - ${selectedUserName}`,
      isGroup: false,
      createdBy: user.id,
      memberIds: [user.id, Number(selectedUser)],
    };

    try {
      await API.post("/chatrooms/createWithUsers", payload);
      onClose();
      onSuccess();
    } catch (error) {
      console.log(error);
      alert("Failed to create private chat room.");
    }
  };

  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered modal-md">
        <div className="modal-content border-0 shadow">
          <div className="modal-header bg-light border-bottom-0 pb-0">
            <h5 className="modal-title text-dark fw-semibold">
              <i className="fas fa-user-plus text-primary me-2"></i>
              Private Chat
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-4 position-relative" ref={dropdownRef}>
                <label className="form-label text-muted small mb-2">
                  Select contact
                </label>

                {/* Custom select input */}
                <div
                  className="form-select-custom"
                  onClick={() => setShowUserList(!showUserList)}
                >
                  {selectedUser ? (
                    <span>{selectedUserName}</span>
                  ) : (
                    <span className="text-muted">Choose a user...</span>
                  )}
                  <i
                    className={`fas fa-chevron-${
                      showUserList ? "up" : "down"
                    } ms-auto`}
                  ></i>
                </div>

                {/* Custom dropdown list - FIXED: Added show class */}
                <div
                  className={`user-list-dropdown ${showUserList ? "show" : ""}`}
                >
                  <div className="user-list-scroll">
                    {allUsers.map((u) => (
                      <div
                        key={u.id}
                        className={`user-list-item ${
                          selectedUser === u.id.toString() ? "selected" : ""
                        }`}
                        onClick={() =>
                          handleSelect(u.id.toString(), u.userName)
                        }
                      >
                        <div className="user-avatar">
                          {u.userName.charAt(0).toUpperCase()}
                        </div>
                        <span className="user-name">{u.userName}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="d-grid gap-2">
                <button
                  type="submit"
                  className="btn btn-primary btn-sm"
                  disabled={!selectedUser}
                >
                  <i className="fas fa-comment me-2"></i>
                  Start Chat
                </button>

                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>

          <div className="modal-footer bg-light border-top-0 pt-0">
            <small className="text-muted">
              <i className="fas fa-lock text-success me-1"></i>
              End-to-end encrypted
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}
