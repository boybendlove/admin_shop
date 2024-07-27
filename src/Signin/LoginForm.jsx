import React, { useState } from "react";
import axios from "axios";
import './Login.css';

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://shopquanao-c8p2.onrender.com/api/admin/login", {
        email,
        password,
      });
      // const data= {token: response.data.token,
      const user = {"user": response.data.user, "token" : response.data.token, "refreshToken": response.data.refreshToken}
      // Xử lý khi đăng nhập thành công, ví dụ: lưu token vào localStorage
      sessionStorage.setItem("user", JSON.stringify(user.user)); // Lưu thông tin người dùng
      sessionStorage.setItem("token", user.token); // Lưu token
      sessionStorage.setItem("refreshToken", user.refreshToken);
      onLogin();
      alert("Đăng nhập thành công!");
      // Điều hướng tới trang chính hoặc trang sau khi đăng nhập thành công
      setTimeout(() => {
        // Chuyển hướng trang
        window.location.href = "/";
      }, 2000);
    } catch (error) {
      setErrorMessage("Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin đăng nhập.");
    }
  };

  return (
    <div className="login-form">
      <h2>Đăng nhập</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Tài khoản</label>
          <input
            type="text"
            id="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Mật khẩu</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" >Đăng nhập</button>
      </form>
      <a href="/register" style={{marginTop: "10px"}}> Register</a>
    </div>
  );
};

export default LoginForm;
