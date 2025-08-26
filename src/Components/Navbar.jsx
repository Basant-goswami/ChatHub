// Navbar.jsx
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import fetchUser from "../assets/Js/Utils";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const { logout } = useAuth();

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

  // console.log(user);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top px-3 py-2">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold text-primary" to="/">
          ChatHub
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-2">
            <li className="nav-item">
              <Link className="nav-link" to="/chats">
                MyChat
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
          </ul>

          <ul className="navbar-nav ms-auto">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle d-flex align-items-center"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src={user?.profileImageUrl || "/images/profile.png"}
                  alt="Profile"
                  width="32"
                  height="32"
                  className="rounded-circle me-2"
                />
                <span>
                  <strong>{user?.fullName || "User"}</strong>
                </span>
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <Link className="dropdown-item" to="/profile">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/logout" onClick={logout}>
                    Logout
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
