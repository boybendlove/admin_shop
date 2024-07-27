import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from '../Products/Component/Pagination';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import EditStausForm from "./UpdateOder"
import Modal from 'react-bootstrap/Modal'; // Import modal component
import Button from 'react-bootstrap/Button'; // Import button component


function History(props) {
    const [products, setProducts] = useState([]);
    const [history, setHistory] = useState([])
    const [historyLenght, setHistoryLenght] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [productsPerPage] = useState(20);
    const token = sessionStorage.getItem("token");
    const refreshToken = sessionStorage.getItem("refreshToken");
    const [isModalOpen, setIsModalOpen] = useState(false); //
    const [status, setstatus] = useState([]);
    const [selectedOderId, setSelectedOderId] = useState(null);
    const [orderId,setOrderId]=useState('')
    console.log(token)
    useEffect(() => {
        const fetchData = async () => {
           try {

               const response = await axios.get(`http://localhost:5000/api/transactions//view/`, {
                   headers: {
                       Authorization: `Bearer ${token}`,
                       'x-refresh-token': refreshToken
                   }
               });
               setTotalPage(Math.ceil(response.data.length / productsPerPage));
               setHistoryLenght(response.data.length)
               setHistory(response.data.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage));
           } catch (error) {
               console.error('Error fetching products:', error);
           } 
       };

       fetchData();
   }, [currentPage, productsPerPage]);
    const maxIndexPagesToShow = totalPage;
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const handleEditStatus = (_id, status) => {
        setSelectedOderId(_id);
        setOrderId(_id)
        setstatus(status)
        setIsModalOpen(true)
    }
    console.log("selectedOderId",selectedOderId)
    // Tạo một mảng chứa các trang từ 1 đến totalPage
    const indexPage = Array.from({ length: maxIndexPagesToShow }, (_, i) => i + 1);
    
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`https://shopquanao-c8p2.onrender.com/api/products/all`);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    const getContentAndStatus = (productId) => {
        const userProducts = products.filter(product => product._id === productId);
        console.log("userProducts",userProducts)
        if (userProducts.length > 0) {
            console.log("userProducts2",userProducts)
            const name = userProducts.map(product => product.name).join(', ');
            console.log("name",name)
            return { name };
        } else {
            return { name: ''};
        }
    };

    console.log("history", history.map(value => value.products.map(e => e.productId)));

    return (
        
        <div className="page-wrapper">
            <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)} dialogClassName="custom-modal-dialog">
             <Modal.Dialog style={{maxWidth: "800px"}}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <EditStausForm  selectedOderId={selectedOderId} status={status} orderId={orderId} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                    <a href="/history">Đóng</a>
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
            </div>
        </div>
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">History</h4>
                            <input className="form-control w-25"  type="text" placeholder="Enter Search!" />
                            <br />
                            <div className="table-responsive">
                            <table className="table table-striped table-bordered no-wrap">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>UserId</th>
                                    <th>Products</th>
                                    <th>Quantity</th>
                                    <th>TotalPriceProduct</th>
                                    <th>TotalShip</th>
                                    <th>TotalPrice</th>                                                
                                    <th>ShippingCity</th>
                                    <th>ShippingAddress</th>
                                    <th>Telephone</th>
                                    <th>CreatedAt</th>
                                    <th>UpdatedAt</th>
                                    <th>Status</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {history && history.map(value => (
                                        <tr key={value._id}>
                                        <td>{value._id}</td>
                                        <td>{value.userId}</td>
                                        {/* <td>a</td> */}
                                        {/* <td>b</td> */}
                                        <td>{value.products.map(e => <Row key={e.productId}>{getContentAndStatus(e.productId).name}</Row>)}</td>
                                        <td>{value.products.map(e => <Row key={e.productId}>{e.quantity}</Row>)}</td> 
                                        <td>{value.totalPriceProduct}</td>
                                        <td>{value.totalShip}</td>
                                        <td>{value.totalPrice}</td>
                                         <td>{value.shippingCity}</td>
                                         <td>{value.shippingAddress}</td>                                    
                                        <td>{value.telephone}</td>
                                        <td>{value.createdAt}</td>    
                                        <td>{value.updatedAt}</td>
                                        <td><button style={{
                                                    cursor: 'pointer',
                                                    backgroundColor: value.status === 'pending' || value.status === 'cancelled' ? 'red' :
                                                                    value.status === 'processing' || value.status === 'shipped' ? 'yellow' :
                                                                    value.status === 'delivered' ? 'green' : 'transparent',
                                                    color: 'white', // Chỉ định màu chữ trắng để tương phản với màu nền
                                                    border: 'none', // Loại bỏ border để nút có giao diện phẳng
                                                    padding: '8px 16px', // Điều chỉnh padding cho vừa với nội dung
                                                    borderRadius: '4px', // Tạo góc bo tròn cho nút
                                                }}
                                                onClick={() => handleEditStatus(value._id, value.status)}
                                            >
                                                {value.status}
                                            </button></td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                                    {historyLenght > 0 && (
                                <Pagination currentPage={currentPage} productsPerPage={productsPerPage} indexPage={indexPage} total={historyLenght} totalPage={totalPage} handlerChangePage={handlePageChange} />)}
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

export default History;