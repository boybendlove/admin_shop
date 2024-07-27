import React from "react";
import LoginForm from "./LoginForm";
import './Login.css';

function Login ({ onLogin }) {
  return (
    <div className="login-page">
      <LoginForm onLogin={onLogin}/>
    </div>
  );
};

export default Login;