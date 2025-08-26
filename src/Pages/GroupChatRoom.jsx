import React, { useEffect, useState } from "react";
import API from "../../api";
import "../assets/css/GroupChatRoom.css";

export default function GroupChatRoom({ user, onClose, onSuccess }) {
  const [roomName, setRoomName] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    API.get("/api/auth/users").then((res) => {
      const filteredUsers = res.data.filter((u) => u.id !== user.id);
      setAllUsers(filteredUsers);
    });
  }, [user.id]);

  const handleSelect = (e) => {
    const id = e.target.value;
    setSelectedUsers((prev) =>
      e.target.checked ? [...prev, id] : prev.filter((uid) => uid !== id)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!roomName || selectedUsers.length === 0) return;

    const payload = {
      name: roomName,
      isGroup: true,
      createdBy: user.id,
      memberIds: [user.id, ...selectedUsers],
    };

    try {
      await API.post("/chatrooms/createWithUsers", payload);
      alert("Chat room created successfully!");
      onSuccess();
      onClose();
    } catch (e) {
      alert("Failed to create chat room. Please try again.");
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
              <i className="fas fa-users text-primary me-2"></i>
              Group Chat
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label text-muted small mb-2">
                  Group Name
                </label>
                <input
                  type="text"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  placeholder="Enter group name"
                  required
                  className="form-control"
                />
              </div>

              <div className="mb-4">
                <label className="form-label text-muted small mb-2">
                  Add Members
                </label>
                <div className="member-list-scroll px-4">
                  {allUsers.map((u) => (
                    <div key={u.id} className="form-check py-2">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={`user-${u.id}`}
                        value={u.id}
                        checked={selectedUsers.includes(String(u.id))}
                        onChange={handleSelect}
                      />
                      <label
                        htmlFor={`user-${u.id}`}
                        className="form-check-label d-flex align-items-center ms-3"
                      >
                        <div className="user-avatar">
                          {u.userName.charAt(0).toUpperCase()}
                        </div>
                        <span className="user-name">{u.userName}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="d-grid gap-2">
                <button
                  type="submit"
                  className="btn btn-primary btn-sm"
                  disabled={!roomName || selectedUsers.length === 0}
                >
                  <i className="fas fa-plus-circle me-2"></i>
                  Create Group
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
              <i className="fas fa-users text-primary me-1"></i>
              Group conversations
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}
