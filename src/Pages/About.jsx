import React from "react";
import "../assets/css/About.css";

export default function About() {
  return (
    <div className="min-vh-100 bg-light py-5">
      {/* Header Section */}
      <div className="bg-primary text-white py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <div className="mb-4">
                <i className="fas fa-info-circle fa-4x mb-3"></i>
                <h1 className="display-5 fw-bold mb-2">About Our Chat App</h1>
                <p className="lead mb-0">
                  A simple, secure, and real-time chat platform built to connect
                  people instantly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-5">
        {/* Features Section */}
        <div className="row mb-5">
          <div className="col-lg-3 col-md-6 mb-4">
            <div className="card border-0 shadow-sm h-100 text-center">
              <div className="card-body py-4">
                <i className="fas fa-comments fa-3x text-primary mb-3"></i>
                <h5 className="fw-semibold mb-2">Real-Time Messaging</h5>
                <p className="text-muted small mb-0">
                  Enjoy seamless conversations with instant delivery using
                  WebSockets.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-4">
            <div className="card border-0 shadow-sm h-100 text-center">
              <div className="card-body py-4">
                <i className="fas fa-circle fa-3x text-success mb-3"></i>
                <h5 className="fw-semibold mb-2">Online Status</h5>
                <p className="text-muted small mb-0">
                  See who's online and stay connected with your friends anytime.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-4">
            <div className="card border-0 shadow-sm h-100 text-center">
              <div className="card-body py-4">
                <i className="fas fa-lock fa-3x text-warning mb-3"></i>
                <h5 className="fw-semibold mb-2">Secure Authentication</h5>
                <p className="text-muted small mb-0">
                  Safe login system with token-based authentication.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-4">
            <div className="card border-0 shadow-sm h-100 text-center">
              <div className="card-body py-4">
                <i className="fas fa-mobile-alt fa-3x text-info mb-3"></i>
                <h5 className="fw-semibold mb-2">Responsive Design</h5>
                <p className="text-muted small mb-0">
                  Works perfectly on desktop, tablet, and mobile devices.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="row justify-content-center mb-5">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm">
              <div className="card-body text-center py-4">
                <i className="fas fa-cogs fa-3x text-secondary mb-3"></i>
                <h3 className="fw-bold mb-4">⚙️ Tech Stack</h3>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <div className="d-flex align-items-center p-3 bg-light rounded">
                      <i className="fab fa-react fa-2x text-primary me-3"></i>
                      <div className="text-start">
                        <h6 className="fw-semibold mb-0">Frontend</h6>
                        <small className="text-muted">React + Bootstrap</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="d-flex align-items-center p-3 bg-light rounded">
                      <i className="fas fa-server fa-2x text-success me-3"></i>
                      <div className="text-start">
                        <h6 className="fw-semibold mb-0">Backend</h6>
                        <small className="text-muted">Spring Boot</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="d-flex align-items-center p-3 bg-light rounded">
                      <i className="fas fa-bolt fa-2x text-warning me-3"></i>
                      <div className="text-start">
                        <h6 className="fw-semibold mb-0">Real-Time</h6>
                        <small className="text-muted">WebSockets + STOMP</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="d-flex align-items-center p-3 bg-light rounded">
                      <i className="fas fa-database fa-2x text-info me-3"></i>
                      <div className="text-start">
                        <h6 className="fw-semibold mb-0">Database</h6>
                        <small className="text-muted">MongoDB / SQL</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Credits */}
        <div className="text-center">
          <div className="card border-0 shadow-sm bg-white">
            <div className="card-body py-4">
              <i className="fas fa-user-tie fa-3x text-primary mb-3"></i>
              <h5 className="fw-bold mb-2">👨‍💻 Developed by Basant</h5>
              <p className="text-muted mb-3">Version 1.0.0</p>

              {/* Social Media Links */}
              <div className=" icons d-flex justify-content-center gap-3">
                <a
                  href="https://github.com/Basant-goswami"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dark text-decoration-none"
                  title="GitHub"
                >
                  <i className="fab fa-github fa-2x"></i>
                </a>
                <a
                  href="https://linkedin.com/in/basant-kumar-bharati"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary text-decoration-none"
                  title="LinkedIn"
                >
                  <i className="fab fa-linkedin fa-2x"></i>
                </a>
                <a
                  href="mailto:basantgoswami7050@gmail.com"
                  className="text-danger text-decoration-none"
                  title="Email"
                >
                  <i className="fas fa-envelope fa-2x"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-top mt-auto">
        <div className="container py-4">
          <div className="text-center text-muted">
            <small>
              <i className="fas fa-heart text-danger me-1"></i>
              Built with passion • {new Date().getFullYear()}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}
