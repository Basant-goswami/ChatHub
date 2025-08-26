import { useEffect, useState } from "react";
import GroupChatRoom from "./GroupChatRoom";
import PrivateChatRoom from "./PrivateChatRoom";
import fetchUser from "../assets/Js/Utils";
import "../assets/css/DashboardCss.css";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [showModel, setShowModel] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const userDetails = await fetchUser();
        setUser(userDetails);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    getUser();
  }, []);

  if (!user) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div
          className="spinner-border text-primary"
          style={{ width: "3rem", height: "3rem" }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-vh-100 bg-light">
        {/* Header Section */}
        <div className="bg-primary text-white py-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8 text-center">
                <div className="mb-4">
                  <i className="fas fa-comments fa-4x mb-3"></i>
                  <h1 className="display-5 fw-bold mb-2">Welcome to ChatHub</h1>
                  <p className="lead mb-0">
                    Hello, <strong>{user?.fullName}</strong>! Ready to connect?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              {/* Stats Cards */}
              <div className="row mb-5">
                <div className="col-md-4 mb-3">
                  <div className="card border-0 shadow-sm h-100 text-center">
                    <div className="card-body py-4">
                      <i className="fas fa-users fa-2x text-primary mb-3"></i>
                      <h3 className="h4 mb-2">Group Chats</h3>
                      <p className="text-muted mb-0">
                        Connect with multiple people
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="card border-0 shadow-sm h-100 text-center">
                    <div className="card-body py-4">
                      <i className="fas fa-user-friends fa-2x text-success mb-3"></i>
                      <h3 className="h4 mb-2">Private Chats</h3>
                      <p className="text-muted mb-0">
                        One-on-one conversations
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="card border-0 shadow-sm h-100 text-center">
                    <div className="card-body py-4">
                      <i className="fas fa-shield-alt fa-2x text-warning mb-3"></i>
                      <h3 className="h4 mb-2">Secure</h3>
                      <p className="text-muted mb-0">End-to-end encryption</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="text-center">
                <h3 className="h4 text-muted mb-4">Get Started</h3>
                <div className="d-flex flex-column flex-md-row justify-content-center gap-3">
                  <button
                    className="btn btn-outline-primary btn-lg px-4 py-3 fw-semibold"
                    onClick={() => setShowModel("group")}
                    style={{
                      // background:
                      //   "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                      // border: "none",
                      // borderRadius: "12px",
                      // minWidth: "200px",
                      border: "2px solid #6366f1",
                      borderRadius: "12px",
                      color: "#6366f1",
                      minWidth: "200px",
                    }}
                  >
                    <i className="fas fa-users me-2"></i>
                    Create Group Chat
                  </button>
                  <button
                    className="btn btn-outline-primary btn-lg px-4 py-3 fw-semibold"
                    onClick={() => setShowModel("private")}
                    style={{
                      border: "2px solid #6366f1",
                      borderRadius: "12px",
                      color: "#6366f1",
                      minWidth: "200px",
                    }}
                  >
                    <i className="fas fa-user-plus me-2"></i>
                    Private Chat
                  </button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="text-center mt-5">
                <button
                  className="btn btn-link text-decoration-none"
                  onClick={() => navigate("/chats")}
                >
                  <i className="fas fa-arrow-right me-2"></i>
                  Go to My Chats
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white border-top mt-auto">
          <div className="container py-4">
            <div className="text-center text-muted">
              <small>
                <i className="fas fa-lock me-1"></i>
                Secure messaging platform • {new Date().getFullYear()}
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showModel === "group" && (
        <GroupChatRoom
          user={user}
          onClose={() => setShowModel(null)}
          onSuccess={() => navigate("/chats")}
        />
      )}
      {showModel === "private" && (
        <PrivateChatRoom
          user={user}
          onClose={() => setShowModel(null)}
          onSuccess={() => navigate("/chats")}
        />
      )}
    </>
  );
}
