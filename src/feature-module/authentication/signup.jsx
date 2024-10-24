import React, { useState } from "react";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { Link } from "react-router-dom";
import { CornerDownLeft } from "react-feather";
import { all_routes } from "../router/all_routes";

const routes = all_routes;
const SignUp = () => {
  const [isToggle, setIsToggle] = useState(false);

  return (
    <div>
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
                <h1>Sign Up</h1>
                <p className="account-subtitle">
                  We will send a confirmation code to your email.
                </p>
                <form >
                  <div className="input-block">
                    <label className="form-label">
                      Username <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder=""
                    />
                  </div>
                  <div className="input-block">
                    <label className="form-label">
                      Email <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder=""
                    />
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
                        placeholder=""
                      />
                      <span
                        className={`fas toggle-password ${
                          isToggle ? "fa-eye" : "fa-eye-slash"
                        }`}
                      />
                    </div>
                  </div>
                  <Link
                    to={routes.homeOne}
                    className="btn btn-outline-light w-100 btn-size mt-1"
                  >
                    Sign Up
                  </Link>
                  <div className="login-or">
                    <span className="or-line" />
                    <span className="span-or">
                      Or, Create an account with your email
                    </span>
                  </div>
                  {/* Social Login */}
                  <div className="social-login">
                    <Link
                      to="#"
                      className="d-flex align-items-center justify-content-center input-block btn google-login w-100"
                    >
                      <span>
                        <ImageWithBasePath
                          src="assets/img/icons/google.svg"
                          className="img-fluid"
                          alt="Google"
                        />
                      </span>
                      Log in with Google
                    </Link>
                  </div>
                  <div className="social-login">
                    <Link
                      to="#"
                      className="d-flex align-items-center justify-content-center input-block btn google-login w-100"
                    >
                      <span>
                        <ImageWithBasePath
                          src="assets/img/icons/facebook.svg"
                          className="img-fluid"
                          alt="Facebook"
                        />
                      </span>
                      Log in with Facebook
                    </Link>
                  </div>
                  {/* /Social Login */}
                  <div className="text-center dont-have">
                    Already have an Account?{" "}
                    <Link to={routes.login}>Sign In</Link>
                  </div>
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
        {/* /Footer */}
      </div>
    </div>
  );
};

export default SignUp;
