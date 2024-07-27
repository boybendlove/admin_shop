import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Col, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal'; // Import modal component
// import Button from 'react-bootstrap/Button'; // Import button component
import "../Products/AddProduct.css"

function EditStausForm({selectedOderId, status, orderId }) {
    const [formData, setFormData] = useState({
        status: status,
    });
    const token = sessionStorage.getItem("token");
    const refreshToken = sessionStorage.getItem("refreshToken");
    const handleChange = (e) => {
        const { value } = e.target;
        setFormData({ ...formData, status: value });
    };
    console.log(selectedOderId)
    const handleSubmitForm = async (event) => {
        console.log(selectedOderId)

        try {
            const response = await axios.put(`https://shopquanao-c8p2.onrender.com/api/admin/Orders/${orderId}/status`, formData,{
                headers: {
                    Authorization: `Bearer ${token}`,
                    'x-refresh-token': refreshToken
                }
            });
            console.log('Updated Product:', response.data);
            setFormData({
                status: status,
            });

        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDelivered = async (event) => {
        try {
            const response = await axios.put(`https://shopquanao-c8p2.onrender.com/api/admin/Orders/${orderId}/confirm`,status,{
                headers: {
                    Authorization: `Bearer ${token}`,
                    'x-refresh-token': refreshToken
                }
            });
            console.log('Updated Status:', response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const handleCancelled = async (event) => {
        try {
            const response = await axios.put(`https://shopquanao-c8p2.onrender.com/api/admin/Orders/${orderId}/cancel`, status,{
                headers: {
                    Authorization: `Bearer ${token}`,
                    'x-refresh-token': refreshToken
                }
            });
            console.log('Updated Status:', response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    console.log(formData.status)
    return (
        <Row className="mb-3">
            <div>
        <Form as={Col}  md="6" className="product-form" style={{margin: "auto"}} noValidate onSubmit={handleSubmitForm}>
                <Form.Group  controlId="validationFormik101">
                    <Form.Label>Name</Form.Label>
                    <Form.Select aria-label="Default select example" value={formData.status} style={{marginLeft: "10px"}} onChange={handleChange}>
                        <option>Select Status</option>
                        <option value="processing">processing</option>
                        <option value="shipped">shipped</option>
                        <option value="delivered">delivered</option>
                        <option value="Cancelled">cancelled</option>

                    </Form.Select>
                </Form.Group>
        
        </Form>
        </div>
        <Button as={Col} md="6" className='product-form-group' type="submit" style={{marginLeft: "10px"}} onClick={handleSubmitForm}>Update Status</Button>
        <Button as={Col} md="5" className='product-form-group' type="button" style={{backgroundColor: "green",margin: "auto", marginTop: "10px"}} onClick={handleDelivered}>Delivered</Button>
        <Button as={Col} md="5" className='product-form-group' type="button" style={{backgroundColor: "red", margin: "auto", marginTop: "10px"}} onClick={handleCancelled}>Cancelled</Button>
        </Row>
    );
}

export default EditStausForm;
