import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios'; // Import Axios
// import Chat from "./Chat/Chat";
import Header from "./Header/Header";
import History from "./History/History";
import Home from "./Home/Home";
import Menu from "./Menu/Menu";
import Products from "./Products/Products";
import Discounts from "./Discount/Discount";
import Users from "./Users/Users";
import Login from "./Signin/login";
import AddProductForm from "./Products/AddProduct"
import RegisterForm from "./Signin/Register"
import Notifications from "./Notifications/Discount/Notifications";
import UserAdmins from "./UserAdmin/UserAdmin";


function App() {
  // Sử dụng useState để kiểm tra trạng thái đăng nhập
  const token = sessionStorage.getItem("token");
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  // Xử lý khi đăng nhập thành công
  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  // useEffect(() => {
  //   // Định nghĩa interceptor của Axios
  //   const interceptor = axios.interceptors.response.use(
  //     response => {
  //       const newAccessToken = response.headers.authorization;
  //       if (newAccessToken) {
  //         // Cập nhật access token mới vào session storage
  //         sessionStorage.setItem('token', newAccessToken);
  //       }
  //       return response;
  //     },
  //     error => {
  //       // Xử lý lỗi
  //       sessionStorage.removeItem('token');
  //       sessionStorage.removeItem('users'); // Xóa thông tin người dùng khỏi session storage
  //       return Promise.reject(error);
  //     }
  //   );

  //   // Hàm xử lý khi component unmount
  //   return () => {
  //     // Xóa interceptor khi component unmount để tránh memory leak
  //     axios.interceptors.response.eject(interceptor);
  //   };
  // }, []);
  return (
    <div>
       {isLoggedIn === true ? (
          <div className="App">
          <BrowserRouter>
            <div
              id="main-wrapper"
              data-theme="light"
              data-layout="vertical"
              data-navbarbg="skin6"
              data-sidebartype="full"
              data-sidebar-position="fixed"
              data-header-position="fixed"
              data-boxed-layout="full"
            >
              <Header />
    
              <Menu />
    
              <Switch>
    
                <Route exact path='/' component={Home} />
                {/* <Route path='/chat' component={Chat} /> */}
                <Route path='/users' component={Users} />
                <Route path='/products' component={Products} />
                <Route path='/add-product' component={AddProductForm} />
                <Route path='/history' component={History} />
                <Route path='/register' component={RegisterForm} />
                <Route path='/discounts' component={Discounts} />
                <Route path='/notifications' component={Notifications} />
                <Route path='/UserAdmin' component={UserAdmins} />
              </Switch>
    
            </div>
          </BrowserRouter>
        </div>
        ) : (
          // Nếu chưa đăng nhập, hiển thị trang đăng nhập
          <div className="App">
            <BrowserRouter>
            <Switch>
            <Route path="/">
              <Login onLogin={handleLogin} />
            </Route>
          </Switch>
          </BrowserRouter>
          </div>
        )}
    
    </div>
  );
}

export default App;
