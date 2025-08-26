import { useState } from "react";
import API from "../../api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Components/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [msg, setMsg] = useState("");
  const [form, setForm] = useState({
    userName: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(form);
    try {
      const res = await API.post("/api/auth/login", form);
      // storing user data in localStorage
      login(res.data.token);
      setMsg("Login successfull!");
      navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.data) {
        setMsg(error.response.data || "Login Failed!");
      } else {
        setMsg("Something went wrong!");
      }
    }
  };

  return (
    <>
      <div className="container my-5">
        <div className="row justify-content-center p-2">
          <div className="col-12 col-md-6 col-lg-3 p-4 shadow-lg p-3 mb-5 bg-white rounded">
            <form onSubmit={handleSubmit}>
              <h2 className="py-2">Sign in</h2>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  User Id or Email address
                </label>
                <input
                  type="text"
                  name="userName"
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="Enter you User ID or Email"
                  aria-describedby="emailHelp"
                  onChange={handleChange}
                />
                <div id="emailHelp" className="form-text">
                  We'll never share your email with anyone else.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="******"
                  onChange={handleChange}
                />
              </div>
              <div className="d-flex justify-content-between">
                <button type="submit" className="btn btn-primary ">
                  Log in
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={() => navigate("/register")}
                >
                  Sign up
                </button>
              </div>
            </form>
            {msg && (
              <div className="py-2">
                <p style={{ color: "red" }}>{msg}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
