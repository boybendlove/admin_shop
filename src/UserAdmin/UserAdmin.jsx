import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from '../Products/Component/Pagination';
import Modal from 'react-bootstrap/Modal'; // Import modal component
import Button from 'react-bootstrap/Button'; // Import button component
import RegisterForm from '../Signin/Register';
import RegisterFormUpdate from './UpdateAdmin';

function UserAdmins(props) {
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(20);
    const [isModalOpen, setIsModalOpen] = useState(false); //

    const [isModalAddOpen, setIsModalAddOpen] = useState(false); //
    const token = sessionStorage.getItem("token");
    const refreshToken = sessionStorage.getItem("refreshToken");
    console.log(token)
    useEffect(() => {
        

        const fetchData = async () => {
            try {

                const response = await axios.get(`https://shopquanao-c8p2.onrender.com/api/admin`, {
                    headers: {
                        
                        Authorization: `Bearer ${token}`,
                        'x-refresh-token': refreshToken
                    }
                });
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } 
        };

        fetchData();
    }, [currentPage, productsPerPage]);
    
    
    const handleDelete = (_id) => {
        console.log("id", _id)
        // Gửi yêu cầu xóa sản phẩm đến API
        fetch(`https://shopquanao-c8p2.onrender.com/api/admin/accounts/:adminId/${_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
                // Cung cấp các thông tin đăng nhập hoặc token xác thực nếu cần
            },
        })
            .then(response => {
                if (response.ok) {
                    // Xóa sản phẩm khỏi giao diện sau khi xóa thành công từ API
                    // onDelete(_id);
                    alert("Đã xóa thành công")
                } else {
                    alert("Đã xóa thất bại")
                }
            })
            .catch(error => {
                // Xử lý lỗi nếu có
            });
    };

    const handleEditProduct = (_id, user) => {
        console.log("userss",user)
        setSelectedProductId(_id);
        setUser(user)
        setIsModalOpen(true)
    }

    const handleAddProduct = () => {
        setIsModalAddOpen(true); // Chuyển hướng đến trang thêm sản phẩm khi nhấn nút
    };
    
    const handleCloseAddProduct = () => {
        setIsModalAddOpen(false);
        // history.push("/products") 
    };
    const handleCloseProduct = () => {
        setIsModalOpen(false);
        // history.push("/products") 
    };
    return (
        <div className="page-wrapper">
              {/* Modal ADD product */}
         <Modal show={isModalAddOpen} onHide={handleCloseAddProduct} dialogClassName="custom-modal-dialog">
             <Modal.Dialog style={{maxWidth: "800px"}}>
                <Modal.Header closeButton>
                    <Modal.Title>Register</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <RegisterForm/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAddProduct}>
                        <a href="/UserAdmin">Đóng</a>
                    </Button>
                </Modal.Footer>
                </Modal.Dialog>
            </Modal>
        {/* Modal update product */}
         <Modal show={isModalOpen} onHide={handleCloseProduct} dialogClassName="custom-modal-dialog">
             <Modal.Dialog style={{maxWidth: "800px"}}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <RegisterFormUpdate id={selectedProductId} setSelectedProductId={setSelectedProductId} user={user} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseProduct}>
                    <a href="/UserAdmin">Đóng</a>
                    </Button>
                </Modal.Footer>
                </Modal.Dialog>
            </Modal>
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
                    <div className="col-5 text-right">
                                <button className="btn btn-primary" onClick={handleAddProduct}>Register</button>
                            </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Admin</h4>
                                <input className="form-control w-25" type="text" placeholder="Enter Search!"/>
                                <br/>
                                <div className="table-responsive">
                                <table className="table table-striped table-bordered no-wrap">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>UserName</th>
                                            <th>Email</th>
                                            <th>Edit</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users && users.map(value => (
                                            <tr key={value._id} >
                                                <td>{value._id}</td>
                                                <td>{value.username}</td>
                                                <td>{value.email}</td>
                                                <td>
                                                                <button style={{ cursor: 'pointer' }} className="btn btn-success" onClick={() => handleEditProduct(value._id, value)}>Update</button>
                                                                &nbsp;
                                                                <button onClick={() => handleDelete(value._id)} style={{ cursor: 'pointer' }} className="btn btn-danger">Delete</button>
                                                </td>
                                            </tr>
                                       ))}
                                    </tbody>
                                </table>
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

export default UserAdmins;