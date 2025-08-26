import React, { useEffect, useState } from "react";
import API from "../../api";
import fetchUser from "../assets/Js/Utils";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ fullName: "", email: "" });
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userData = async () => {
      try {
        setIsLoading(true);
        const response = await fetchUser();
        setUser(response);
        setForm({ fullName: response.fullName, email: response.email });
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user:", error);
        setIsLoading(false);
      }
    };
    userData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await API.put("/api/auth/update-profile", form);
      setUser(res.data);
      showAlert("success", "Profile updated successfully!");
    } catch (err) {
      showAlert("danger", err.response?.data || "Error updating profile");
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      await API.put("/api/auth/update-password", { oldPassword, newPassword });
      showAlert("success", "Password changed successfully!");
      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      showAlert("danger", "Incorrect old password or error updating password");
    }
  };

  const showAlert = (type, message) => {
    const alertDiv = document.createElement("div");
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 end-0 m-3`;
    alertDiv.style.zIndex = "1100";
    alertDiv.style.width = "300px";
    alertDiv.role = "alert";
    alertDiv.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    document.body.appendChild(alertDiv);

    setTimeout(() => {
      alertDiv.classList.remove("show");
      setTimeout(() => alertDiv.remove(), 150);
    }, 3000);
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div
          className="spinner-border text-primary"
          style={{ width: "3rem", height: "3rem" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-lg border-0 overflow-hidden">
            <div className="card-header bg-primary bg-gradient text-white py-4">
              <div className="d-flex justify-content-between align-items-center">
                <h2 className="mb-0">
                  <i className="bi bi-person-circle me-2"></i>
                  User Profile
                </h2>
              </div>
            </div>

            <div className="card-body">
              <ul
                className="nav nav-tabs nav-justified mb-4"
                id="profileTabs"
                role="tablist"
              >
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${
                      activeTab === "profile" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("profile")}
                  >
                    <i className="bi bi-person me-2"></i>Profile
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${
                      activeTab === "security" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("security")}
                  >
                    <i className="bi bi-shield-lock me-2"></i>Security
                  </button>
                </li>
              </ul>

              <div className="tab-content">
                <div
                  className={`tab-pane fade ${
                    activeTab === "profile" ? "show active" : ""
                  }`}
                >
                  <div className="d-flex align-items-center mb-4">
                    <div className="flex-shrink-0">
                      {/* Profile Image Display */}
                      {user.profileImageUrl ? (
                        <img
                          src={user.profileImageUrl}
                          alt="Profile"
                          className="rounded-circle border border-3 border-white shadow-sm"
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <div
                          className="bg-light rounded-circle d-flex align-items-center justify-content-center"
                          style={{ width: "100px", height: "100px" }}
                        >
                          <i
                            className="bi bi-person text-primary"
                            style={{ fontSize: "3rem" }}
                          ></i>
                        </div>
                      )}
                    </div>
                    <div className="flex-grow-1 ms-4">
                      <h3 className="mb-1">{user.fullName}</h3>
                      <p className="text-muted mb-2">
                        <i className="bi bi-at"></i> @{user.userName}
                      </p>
                      {/* <p className="text-muted mb-0">
                        <i className="bi bi-calendar3 me-1"></i>
                        Member since{" "}
                        {new Date(user.createdAt).toLocaleDateString()}
                      </p> */}
                    </div>
                  </div>

                  <form onSubmit={handleProfileUpdate}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label htmlFor="fullName" className="form-label">
                          Full Name
                        </label>
                        <div className="input-group mb-3">
                          <span className="input-group-text">
                            <i className="bi bi-person"></i>
                          </span>
                          <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={form.fullName}
                            onChange={handleChange}
                            className="form-control"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="email" className="form-label">
                          Email
                        </label>
                        <div className="input-group mb-3">
                          <span className="input-group-text">
                            <i className="bi bi-envelope"></i>
                          </span>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="form-control"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="d-grid mt-3">
                      <button type="submit" className="btn btn-primary btn-lg">
                        <i className="bi bi-save me-2"></i>Update Profile
                      </button>
                    </div>
                  </form>
                </div>

                <div
                  className={`tab-pane fade ${
                    activeTab === "security" ? "show active" : ""
                  }`}
                >
                  <form onSubmit={handlePasswordChange}>
                    <div className="mb-4">
                      <h5 className="text-muted mb-3">Change Password</h5>
                      <div className="mb-3">
                        <label htmlFor="oldPassword" className="form-label">
                          Current Password
                        </label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <i className="bi bi-lock"></i>
                          </span>
                          <input
                            type="password"
                            id="oldPassword"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            className="form-control"
                            required
                          />
                        </div>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="newPassword" className="form-label">
                          New Password
                        </label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <i className="bi bi-key"></i>
                          </span>
                          <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="form-control"
                            required
                          />
                        </div>
                        <div className="form-text text-muted">
                          Password must be at least 8 characters long
                        </div>
                      </div>
                    </div>

                    <div className="d-grid">
                      <button type="submit" className="btn btn-warning btn-lg">
                        <i className="bi bi-shield-lock me-2"></i>Change
                        Password
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
