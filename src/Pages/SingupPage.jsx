import { useState } from "react";
import API from "../../api";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const navigate = useNavigate();

  const [conformPassword, setConformPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [form, setForm] = useState({
    fullName: "",
    userName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleConformPassword = (e) => {
    setConformPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(form);

    if (conformPassword !== form.password) {
      setMsg("Password doesn't match.");
      // console.log(msg);
      return;
    }

    try {
      const res = await API.post("/api/auth/register", form);
      setMsg("Registration successfull!");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      if (error.response && error.response.data) {
        setMsg(error.response.data || "Registration failed!");
      } else {
        setMsg("Something went wrong!");
      }
    }
  };

  return (
    <>
      <div className="container my-5">
        <div className="row justify-content-center p-2">
          <div className="col-12 col-mid-6 col-lg-3 p-4 shadow-lg p-3 mb-5 bg-white rounded">
            <form className="" onSubmit={handleSubmit}>
              <div className="col">
                <label htmlFor="validationServer01" className="form-label">
                  Full name
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="fullName"
                  placeholder="John Deo"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col">
                <label
                  htmlFor="validationServerUsername"
                  className="form-label"
                >
                  Username
                </label>
                <div className="input-group has-validation">
                  <span className="input-group-text" id="inputGroupPrepend3">
                    @
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    id="validationServerUsername"
                    name="userName"
                    aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback"
                    placeholder="John123"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="col">
                <label htmlFor="validationServer03" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  aria-describedby="validationServer03Feedback"
                  placeholder="example@email.com"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col">
                <label htmlFor="validationServer03" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control "
                  name="password"
                  aria-describedby="validationServer03Feedback"
                  placeholder="******"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col">
                <label htmlFor="validationServer03" className="form-label">
                  Conform Password
                </label>
                <input
                  type="password"
                  className="form-control "
                  name="password2"
                  aria-describedby="validationServer03Feedback"
                  placeholder="******"
                  onChange={handleConformPassword}
                  required
                />
              </div>

              <div className="col mt-4">
                <button className="btn btn-primary" type="submit">
                  Register user
                </button>
              </div>
            </form>

            {msg && (
              <div className="container py-4 text-center">
                <p style={{ color: "red", fontWeight: "bold" }}>{msg}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
