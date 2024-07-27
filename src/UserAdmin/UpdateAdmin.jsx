import React, { useState } from 'react';
import '../Signin/Login.css';
import axios from 'axios';

const RegisterFormUpdate = (id, user) => {
    console.log("userna",user)  
    console.log("usernaid",id) 
    const [username,setUsername] = useState(id.user.username)
    const [password,setPassword] = useState("")
    const [email, setEmail] = useState(id.user.email)
    const [phoneNumber,setPhoneNumber] = useState("")
    console.log("username",username)
    console.log("password",password)
    console.log("email",email)
    const token = sessionStorage.getItem("token");
    const refreshToken = sessionStorage.getItem("refreshToken");
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      try {
        const response = await axios.put(`https://shopquanao-c8p2.onrender.com/api/admin/accounts/${id.id}`, {
          username: username,
          email: email,
          password: password,
        }, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            'x-refresh-token': refreshToken
          }
        });
    
        if (response.data.message === 'Admin account updated successfully') {
          alert("Sửa tài khoản thành công");
          console.log(response.data);
        } else {
          console.error('Đăng ký thất bại:', response.data.message);
        }
      } catch (error) {
        console.error('Lỗi:', error);
      }
    };

  return (
    <div className='login-page'>
    <div className="register-form" style={{marginTop:"10%"}}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default RegisterFormUpdate;