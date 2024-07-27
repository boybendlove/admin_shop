import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Menu(props) {

    const [currentTime, setCurrentTime] = useState(new Date());
    const [clock, setClock] = useState(new Date().toLocaleTimeString("vi-VN"));
    const token = sessionStorage.getItem("token");
    const refreshToken = sessionStorage.getItem("refreshToken");
    const user = JSON.parse(sessionStorage.getItem("user"))
    // const user = sessionStorage.getItem("user")
    const [isModalOpen, setIsModalOpen] = useState( user.username === 'cuong3') //
    // Effect để cập nhật thời gian mỗi giây
    useEffect(() => {
        const intervalId = setInterval(() => {
            const date = new Date();
            setClock(date.toLocaleTimeString("vi-VN"));
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);
    const handleReport = async (event) => {
        try {
            // Gửi yêu cầu POST để tạo báo cáo
            const response = await axios.post('https://shopquanao-c8p2.onrender.com/api/admin/reports/generate', {
                // Không cần gửi dữ liệu trong yêu cầu POST
            }, {
                headers: {
                    'Content-Type': `application/json`,
                    Authorization: `Bearer ${token}`,
                    'x-refresh-token': refreshToken
                }
            });
            console.log('Response:', response.data);
            // Xử lý phản hồi từ máy chủ nếu cần
            alert("Update report successfully")
        } catch (error) {
            console.error('Error:', error);
            // Xử lý lỗi nếu có
        }
    };
    
    return (
        <aside className="left-sidebar" data-sidebarbg="skin6">
            <div className="scroll-sidebar" data-sidebarbg="skin6">
                <nav className="sidebar-nav">
                    <div className="flex flex-col justify-center items-center">
                        <h1  className="text-center font-bold text-slate-500">{clock}</h1>
                        <p className="text-center text-slate-500 mt-2">
                            {new Date().toLocaleDateString("vi-VN", {
                                weekday: "long",
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })}
                        </p>
                    </div>
                    <ul id="sidebarnav">
                        <li className="sidebar-item"> <a className="sidebar-link sidebar-link" href='/'>
                            <i data-feather="home" className="feather-icon"></i><span
                                className="hide-menu">Dashboard</span></a></li>
                        <li className="list-divider"></li>

                        <li className="nav-small-cap"><span className="hide-menu">Components</span></li>
                        {/* <li className="sidebar-item"> <a className="sidebar-link sidebar-link" href='/chat'>
                            <i data-feather="message-square" className="feather-icon"></i><span
                                className="hide-menu">Customer</span></a></li> */}

                        <li className="sidebar-item"> <a className="sidebar-link has-arrow" href="#"
                            aria-expanded="false"><i data-feather="grid" className="feather-icon"></i><span
                                className="hide-menu">Tables </span></a>
                            <ul aria-expanded="false" className="collapse  first-level base-level-line">
                                <li className="sidebar-item"><a href="/users" className="sidebar-link"><span
                                    className="hide-menu">
                                    Datatables Customers
                                </span></a>
                                </li>
                                <li className="sidebar-item"><a href="/products" className="sidebar-link"><span className="hide-menu">
                                    Datatables Products
                                </span></a>
                                </li>
                                <li className="sidebar-item"><a href="/history" className="sidebar-link"><span
                                    className="hide-menu">
                                    Datatables History
                                </span></a>
                                </li>
                                <li className="sidebar-item"><a href="/discounts" className="sidebar-link"><span
                                    className="hide-menu">
                                    Datatables Discount
                                </span></a>
                                </li>
                                <li className="sidebar-item"><a href="/notifications" className="sidebar-link"><span
                                    className="hide-menu">
                                    Datatables Notification
                                </span></a>
                                </li>
                            </ul>
                        </li>

                        <li className="list-divider"></li>
                        <li className="nav-small-cap"><span className="hide-menu">Authentication</span></li>

                        <li className="sidebar-item" onClick={()=> handleReport()}> <a className="sidebar-link sidebar-link" href="/"
                            aria-expanded="false"><i data-feather="lock" className="feather-icon"></i><span
                                className="hide-menu">Reports
                            </span></a>
                        </li>
                        {/* <li className="sidebar-item"> <a className="sidebar-link sidebar-link"
                            href="/register" aria-expanded="false"><i data-feather="lock"
                                className="feather-icon"></i><span className="hide-menu">Register
                            </span></a>
                        </li> */}
                        {isModalOpen && user.username === 'cuong3' && (
                            <li className="sidebar-item"> <a className="sidebar-link sidebar-link"
                            href="/UserAdmin" aria-expanded="false"><i data-feather="lock"
                                className="feather-icon"></i><span className="hide-menu">UserAdmin
                            </span></a>
                        </li>
                        )}
                    </ul>
                </nav>
            </div>
        </aside>
    );
}

export default Menu;