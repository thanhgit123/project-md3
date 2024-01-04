import React, { useEffect, useState } from "react";
import "./Login.scss";
import { success, failed } from "../../utils/notify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import publicAxios from "../../config/publicAxios";
export default function Login() {
  const dispatch = useDispatch();

  const [isLoginFormVisible, setLoginFormVisible] = useState(true);
  const handleLoginClick = () => {
    setLoginFormVisible(true);
  };
  const handleSignupClick = () => {
    setLoginFormVisible(false);
  };

  // register
  const [registerUser, setRegisterUser] = useState({
    user_name: "",
    email: "",
    password: "",
  });

  const handleGetValue = (e) => {
    setRegisterUser({ ...registerUser, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await publicAxios.post(
        "/api/auth/signup",
        registerUser
      );
      success(response.data.message);
      setRegisterUser({
        user_name: "",
        email: "",
        password: "",
      })
    } catch (error) {
      failed(error.response.data.message);
    }
  };

  // login
  const navigate = useNavigate();
  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });


  const handleGetValueLogin = (e) => {
    setLoginUser({ ...loginUser, [e.target.name]: e.target.value });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    // Xử lý đăng nhập
    try {
      const response = await publicAxios.post(
        "/api/auth/login",
        loginUser
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userLogin", JSON.stringify(response.data.user));
      success(response.data.message);
      if(response.data.user.role == 1 ){
        window.location.href= "/admin";
      }else{
        window.location.href= "/products";
      }
    } catch (error) {
      failed(error.response.data.message);
    } 
  };
  

  return (
    <>
      <div className="bigDiv">
        <div className="signUpContainer">
          <div
            className={`form-structor ${isLoginFormVisible ? "" : "slide-up"}`}
          >
            <div className="signup">
              <h2 className="form-title" id="signup" onClick={handleLoginClick}>
                <span>or</span>Sign Up
              </h2>
              <div className="form-holder">
                <input
                  type="text"
                  className="input"
                  placeholder="Name"
                  onChange={handleGetValue}
                  name="user_name"
                  value={registerUser.user_name}
                />
                <input
                  type="email"
                  className="input"
                  placeholder="Email"
                  onChange={handleGetValue}
                  name="email"
                  value={registerUser.email}
                />
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                  onChange={handleGetValue}
                  name="password"
                  value={registerUser.password}
                />
              </div>
              <button className="submit-btn" onClick={handleRegister}>
                Sign up
              </button>
            </div>

            {/* login */}

            <div className={`login ${isLoginFormVisible ? "slide-up" : ""}`}>
              <div className="center">
                <h2
                  className="form-title"
                  id="login"
                  onClick={handleSignupClick}
                >
                  <span>or</span>Log In
                </h2>
                <div className="form-holder"> 
                  <input
                    type="email"
                    className="input"
                    placeholder="Email"
                    onChange={handleGetValueLogin}
                    name="email"
                    value={loginUser.email}
                  />
                  <input
                    type="password"
                    className="input"
                    placeholder="Password"
                    onChange={handleGetValueLogin}
                    name="password"
                    value={loginUser.password}
                  />
                </div>
                <button className="submit-btn" onClick={handleLogin}>
                  Log in
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="switchContainer">
          <div className="questionLogin">
            {isLoginFormVisible ? (
              <p>
                Already have an account? {"  "}
                <span className="switchLink" onClick={handleSignupClick}>
                  Log In
                </span>
              </p>
            ) : (
              <p>
                Don't have an account?{" "}
                <span className="switchLink" onClick={handleLoginClick}>
                  Sign Up
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
