import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from '../Products/Component/Pagination';
import { useHistory } from 'react-router-dom';
import EditDiscountForm from './EditDiscount';
import AddDiscountForm from './AddDiscount';
import Modal from 'react-bootstrap/Modal'; // Import modal component
import Button from 'react-bootstrap/Button'; // Import button component

import './Discount.css'


function Discounts(props) {
    // const history = useHistory();
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(20);
    const [search, setSearch] = useState('');
    const [refreshPage, setRefreshPage] = useState(false); // State để làm mới trang
    const [product, setProduct] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState(null); // State để lưu ID của sản phẩm được chọn để chỉnh sửa
    const [isModalOpen, setIsModalOpen] = useState(false); //
    const [isModalAddOpen, setIsModalAddOpen] = useState(false); //
    const [productsLenght, setProductsLenght] = useState(0);
    const [totalPage, setTotalPage] = useState(1);

    const token = sessionStorage.getItem("token");
    const refreshToken = sessionStorage.getItem("refreshToken");
    // Cập nhật hàm handleEditProduct để set selectedProductId
    const handleEditProduct = (_id, product) => {
        setSelectedProductId(_id);
        setProduct(product)
        setIsModalOpen(true)
    }

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`https://shopquanao-c8p2.onrender.com/api/discount/apply-discount/view`);
                setTotalPage(Math.ceil(response.data.length / productsPerPage));
                setProductsLenght(response.data.length)
                // setProducts(response.data)
                setProducts(response.data.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage));
                console.log("response.data",response.data)
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, [currentPage, productsPerPage, search]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    console.log("products",products)
    console.log("totalPage",totalPage)
    const onChangeText = (e) => {
        const value = e.target.value;
        setSearch(value);
        setCurrentPage(1); // Reset current page when searching
    };

    const handleRefreshPage = () => {
        setRefreshPage(prevState => !prevState); // Đảo ngược giá trị của refreshPage để làm mới trang
    };

    const handleDelete = (_id) => {
        console.log("id", _id)
        // Gửi yêu cầu xóa sản phẩm đến API
        fetch(`https://shopquanao-c8p2.onrender.com/api/admin/discounts/${_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
                'x-refresh-token': refreshToken
                // Cung cấp các thông tin đăng nhập hoặc token xác thực nếu cần
            },
        })
            .then(response => {
                if (response.ok) {
                    // Xóa sản phẩm khỏi giao diện sau khi xóa thành công từ API
                    // onDelete(_id);
                    alert("Đã xóa thành công")
                    handleRefreshPage(); // Gọi hàm làm mới trang sau khi xóa thành công
                } else {
                    alert("Đã xóa thất bại")
                }
            })
            .catch(error => {
                // Xử lý lỗi nếu có
            });
    };

    
    const handleAddProduct = () => {
        setIsModalAddOpen(true); // Chuyển hướng đến trang thêm sản phẩm khi nhấn nút
    };
    const maxIndexPagesToShow = totalPage;
    // Tạo một mảng chứa các trang từ 1 đến totalPage
    const indexPage = Array.from({ length: maxIndexPagesToShow }, (_, i) => i + 1);
    console.log("products",products)
    console.log("products", products)
    return (
        <div className="page-wrapper">
            {/* Modal ADD product */}
         <Modal show={isModalAddOpen} onHide={() => setIsModalAddOpen(false)} dialogClassName="custom-modal-dialog">
             <Modal.Dialog style={{maxWidth: "800px"}}>
                <Modal.Header closeButton>
                    <Modal.Title>ADD Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <AddDiscountForm/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setIsModalAddOpen(false)}>
                    <a href="/discounts">Đóng</a>
                    </Button>
                </Modal.Footer>
                </Modal.Dialog>
            </Modal>
        {/* Modal update product */}
         <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)} dialogClassName="custom-modal-dialog">
             <Modal.Dialog style={{maxWidth: "800px"}}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <EditDiscountForm productId={selectedProductId} setSelectedProductId={setSelectedProductId} product={product} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                    <a href="/discounts">Đóng</a>
                    </Button>
                </Modal.Footer>
                </Modal.Dialog>
            </Modal>
                <div>
                    <div className="page-breadcrumb">
                        <div className="row">
                            <div className="col-7 align-self-center">
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
                                <button className="btn btn-primary" onClick={handleAddProduct}>Add Discounts</button>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-title">Discounts</h4>
                                        <div className='gap-2' style={{display:"flex"}}>
                                            <div>
                                                <input className="form-control w-100" onChange={onChangeText} type="text" placeholder="Enter Search!" />
                                            </div>
                                            <div>
                                                <button className="btn btn-success"  onClick={handleRefreshPage}>Làm mới trang</button>
                                            </div>
                                        </div>

                                        <br />
                                        <div className="table-responsive">
                                            <table className="table table-striped table-bordered no-wrap">
                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>Code</th>
                                                        <th>Discount Percentage</th>
                                                        <th>Start Date</th>
                                                        <th>End Date</th>
                                                        <th>Quantity</th>
                                                        <th>Created At</th>
                                                        <th>Updated At</th>
                                                        <th>User By</th>
                                                        <th>Edit</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {products && products.map(value => (
                                                        <tr key={value._id}>
                                                            <td>{value._id}</td>
                                                            <td>{value.code}</td>
                                                            <td>{value.discountPercentage}</td>
                                                            <td>{value.startDate}</td>
                                                            <td>{value.endDate}</td>
                                                            <td>{value.quantity}</td>
                                                            <td>{new Date(value.createdAt).toLocaleString()}</td>
                                                            <td>{new Date(value.updatedAt).toLocaleString()}</td>
                                                            <td>{value.usedBy}</td>
                                                            <td>
                                                                <button style={{ cursor: 'pointer' }} className="btn btn-success" onClick={() => handleEditProduct(value._id, value)}>Update</button>
                                                                &nbsp;
                                                                <button onClick={() => handleDelete(value._id)} style={{ cursor: 'pointer' }} className="btn btn-danger">Delete</button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            {productsLenght > 0 && (
                                    <Pagination currentPage={currentPage} productsPerPage={productsPerPage} indexPage={indexPage} total={productsLenght} totalPage={totalPage} handlerChangePage={handlePageChange} />)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <footer className="footer text-center text-muted">
                        All Rights Reserved by Adminmart. Designed and Developed.
                    </footer>
                </div>
        </div>
    );
}

export default Discounts;
