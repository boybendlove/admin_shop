import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from './Component/Pagination';
import { useHistory } from 'react-router-dom';
import EditProductForm from './EditProduct';
import AddProductForm from './AddProduct';
import Modal from 'react-bootstrap/Modal'; // Import modal component
import Button from 'react-bootstrap/Button'; // Import button component

import './products.css'


function Products(props) {
    const history = useHistory();
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


    // Cập nhật hàm handleEditProduct để set selectedProductId
    const handleEditProduct = (_id, product) => {
        setSelectedProductId(_id);
        setProduct(product)
        setIsModalOpen(true)
    }

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`https://shopquanao-c8p2.onrender.com/api/products/all`);
                setTotalPage(Math.ceil(response.data.length / productsPerPage));
                setProductsLenght(response.data.length)
                setProducts(response.data.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage));
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
        fetch(`https://shopquanao-c8p2.onrender.com/api/admin/Products/${_id}`, {
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
    
    const handleCloseAddProduct = () => {
        setIsModalAddOpen(false);
        history.push("/products") 
    };
    const handleCloseProduct = () => {
        setIsModalOpen(false);
        history.push("/products") 
    };
    const maxIndexPagesToShow = totalPage;
    // Tạo một mảng chứa các trang từ 1 đến totalPage
    const indexPage = Array.from({ length: maxIndexPagesToShow }, (_, i) => i + 1);
    console.log("products",products)
    console.log("products", products)
    return (
        <div className="page-wrapper">
            {/* Modal ADD product */}
         <Modal show={isModalAddOpen} onHide={handleCloseAddProduct} dialogClassName="custom-modal-dialog">
             <Modal.Dialog style={{maxWidth: "800px"}}>
                <Modal.Header closeButton>
                    <Modal.Title>ADD Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <AddProductForm/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAddProduct}>
                        <a href="/products">Đóng</a>
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
                <EditProductForm productId={selectedProductId} setSelectedProductId={setSelectedProductId} product={product} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseProduct}>
                    <a href="/products">Đóng</a>
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
                                <button className="btn btn-primary" onClick={handleAddProduct}>Add Product</button>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-title">Products</h4>
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
                                                        <th>Name</th>
                                                        <th>Price</th>
                                                        <th>Category</th>
                                                        <th>Brand</th>
                                                        <th>Size</th>
                                                        <th>Quantity</th>
                                                        <th>Type</th>
                                                        <th>Description</th>
                                                        <th>Created At</th>
                                                        <th>Updated At</th>
                                                        <th>Photos</th>
                                                        <th>Edit</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {products && products.map(value => (
                                                        <tr key={value._id}>
                                                            <td>{value._id}</td>
                                                            <td>{value.name}</td>
                                                            <td>{value.price}</td>
                                                            <td>{value.category}</td>
                                                            <td>{value.brand}</td>
                                                            <td>{value.size.join(', ')}</td>
                                                            <td>{value.quantity}</td>
                                                            <td>{value.typeOf}</td>
                                                            <td>{value.description}</td>
                                                            <td>{new Date(value.createdAt).toLocaleString()}</td>
                                                            <td>{new Date(value.updatedAt).toLocaleString()}</td>
                                                            <td>
                                                                {value.photos.map((photo, index) => (
                                                                    <img key={index} src={photo} alt={`Photo ${index + 1}`} style={{ height: '60px', width: '60px', marginRight: '5px' }} />
                                                                ))}
                                                            </td>
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

export default Products;
