import React, { useState, useEffect  } from "react";
import { Link, Navigate } from "react-router-dom";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { CornerDownLeft } from 'react-feather';
import { all_routes } from "../router/all_routes";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

const routes = all_routes
const Login = () => {

  useEffect(() => {
    const loggedIn = Cookies.get("isLoggedIn") === "true";
    if(loggedIn){
      navigate(routes.userBookings);
    }
  }, []);
  const [isToggle, setIsToggle] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === "administrator@secret.com" && password === "mystrongpassword") {
      Cookies.set("isLoggedIn", "true", { expires: 1 / 24 });

      navigate(routes.userBookings);
    } else {
      toast.error("Incorrect login or password", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="main-wrapper login-body">
      {/* Header */}
      <header className="log-header">
        <Link to={routes.homeOne}>
          <ImageWithBasePath
            className="img-fluid logo-dark"
            src="assets/img/logo.svg"
            alt="Logo"
          />
        </Link>
      </header>
      {/* /Header */}
      <div className="login-wrapper">
        <div className="loginbox">
          <div className="login-auth">
            <div className="login-auth-wrap">
              <div className="sign-group">
                <Link to={routes.homeOne} className="btn sign-up">
                  <span>
                    <CornerDownLeft />
                  </span>{" "}
                  Back To Home
                </Link>
              </div>
              <h1>Sign In</h1>
              <form onSubmit={handleSubmit}>
                <div className="input-block">
                  <label className="form-label">
                    Username <span className="text-danger">*</span>
                  </label>
                  <input type="email" className="form-control" placeholder="Enter your username" value={username}
                    onChange={(e) => {
                      console.log(username)
                      setUsername(e.target.value)
                    }}
                    required />
                </div>
                <div className="input-block">
                  <label className="form-label">
                    Password <span className="text-danger">*</span>
                  </label>
                  <div
                    className="pass-group"
                    onClick={() => setIsToggle(!isToggle)}
                  >
                    <input
                      type={isToggle ? "text" : "password"}
                      className="form-control pass-input"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <span
                      className={`fas toggle-password ${isToggle ? "fa-eye" : "fa-eye-slash"
                        }`}
                    />
                  </div>
                </div>
                <button
                 type="submit"
                  className="btn btn-outline-light w-100 btn-size mt-1"
                >
                  Sign In
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="log-footer">
        <div className="container-fluid">
          {/* Copyright */}
          <div className="copyright">
            <div className="copyright-text">
              <p>© 2023 Dreams Rent. All Rights Reserved.</p>
            </div>
          </div>
          {/* /Copyright */}
        </div>
      </footer>
      <ToastContainer />
      {/* /Footer */}
    </div>
  );
};

export default Login;
