import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from '../Products/Component/Pagination';

function Users(props) {
    const [feedbacks, setFeedbacks] = useState([]);
    // const [content,setcontent]= useState('')
    const [users, setUsers] = useState([]);
    const [usersLenght, setUsersLenght] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [productsPerPage] = useState(20);
    const [isModalOpen, setIsModalOpen] = useState(false); //
    const [status, setstatus] = useState([]);
    const [selectedOderId, setSelectedOderId] = useState(null);
    const [orderId,setOrderId]=useState('')
    const token = sessionStorage.getItem("token");
    const refreshToken = sessionStorage.getItem("refreshToken");
    console.log(token)
    useEffect(() => {
        

        const fetchData = async () => {
            try {

                const response = await axios.get(`https://shopquanao-c8p2.onrender.com/api/admin/customers`, {
                    headers: {
                        
                        Authorization: `Bearer ${token}`,
                        'x-refresh-token': refreshToken
                    }
                });
                setTotalPage(Math.ceil(response.data.length / productsPerPage));
                setUsersLenght(response.data.length)
                setUsers(response.data.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage));
            } catch (error) {
                console.error('Error fetching products:', error);
            } 
        };

        fetchData();
    }, [currentPage, productsPerPage]);
    useEffect(() => {
        

        const fetchData = async () => {
            try {
                
                const response = await axios.get(`https://shopquanao-c8p2.onrender.com/api/admin/feedbacks`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'x-refresh-token': refreshToken
                    }
                });
                setFeedbacks(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } 
        };

        fetchData();
    }, []);
    
    const getContentAndStatus = (userID) => {
        const userFeedbacks = feedbacks.filter(feedback => feedback.userID === userID);
        if (userFeedbacks.length > 0) {
            const content = userFeedbacks.map(feedback => feedback.content).join(', ');
            const status = userFeedbacks.map(feedback => feedback.status).join(', ');
            const _id = userFeedbacks.map(feedback => feedback._id).join(', ');
            return { content, status ,_id };
        } else {
            return { content: '', status: '' };
        }
    };
    const handleEditStatus = (_id, product) => {
        setSelectedOderId(_id);
        setOrderId(_id)
        setstatus(product)
        setIsModalOpen(true)
    }
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const maxIndexPagesToShow = totalPage;
    // Tạo một mảng chứa các trang từ 1 đến totalPage
    const indexPage = Array.from({ length: maxIndexPagesToShow }, (_, i) => i + 1);
    console.log("users",users)
    console.log("Feedbacks",feedbacks)
    return (
        <div className="page-wrapper">
            <div className="page-breadcrumb">
                <div className="row">
                    <div className="col-7 align-self-center">
                        <h4 className="page-title text-truncate text-dark font-weight-medium mb-1">Basic Initialisation</h4>
                        <div className="d-flex align-items-center">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb m-0 p-0">
                                    <li className="breadcrumb-item"><a href="/" className="text-muted">Home</a></li>
                                    <li className="breadcrumb-item text-muted active" aria-current="page">Table</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Customers</h4>
                                <input className="form-control w-25" type="text" placeholder="Enter Search!"/>
                                <br/>
                                <div className="table-responsive">
                                <table className="table table-striped table-bordered no-wrap">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>UserName</th>
                                            <th>Email</th>
                                            <th>Feedback</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users && users.map(value => (
                                            <tr key={value._id} >
                                                <td>{value._id}</td>
                                                <td>{value.username}</td>
                                                <td>{value.email}</td>
                                                <td>{getContentAndStatus(value._id).content}</td>
                                                 <td>{getContentAndStatus(value._id).status}<button style={{
                                                    cursor: 'pointer',
                                                    backgroundColor: getContentAndStatus(value._id).status === 'pending' ? 'red' :
                                                                        getContentAndStatus(value._id).status === 'resolved' ? 'green' : 'transparent',
                                                    color: 'white', // Chỉ định màu chữ trắng để tương phản với màu nền
                                                    border: 'none', // Loại bỏ border để nút có giao diện phẳng
                                                    padding: '8px 16px', // Điều chỉnh padding cho vừa với nội dung
                                                    borderRadius: '4px', // Tạo góc bo tròn cho nút
                                                }}
                                                onClick={() => handleEditStatus(getContentAndStatus(value._id)._id, getContentAndStatus(value._id).status)}
                                            >
                                                {getContentAndStatus(value._id).status}
                                            </button></td>
                                            </tr>
                                       ))}
                                    </tbody>
                                </table>
                                {usersLenght > 0 && (
                                <Pagination currentPage={currentPage} productsPerPage={productsPerPage} indexPage={indexPage} total={usersLenght} totalPage={totalPage} handlerChangePage={handlePageChange} />)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="footer text-center text-muted">
                All Rights Reserved by Adminmart. Designed and Developed by 
            </footer>
        </div>
    );
}

export default Users;