import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Col, Row } from 'react-bootstrap';
import "./AddDiscount.css"

function EditDiscountForm({ productId, setSelectedProductId, product }) {
    const token = sessionStorage.getItem("token");
  const refreshToken = sessionStorage.getItem("refreshToken");
  
    const [formData, setFormData] = useState({
        code: product.code,
        discountPercentage: product.discountPercentage,
        startDate: product.startDate,
        endDate: product.endDate,
        quantity: product.quantity,
    });
    console.log('formData',formData)
    const [errors, setErrors] = useState({});


    const handleChange = (e) => {
        const { name, value } = e.target;
        const newValue = name === "price" || name === "quantity" ? parseInt(value) : value;
        setFormData({ ...formData, [name]: newValue });
    };

    const handleSubmitForm = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(`https://shopquanao-c8p2.onrender.com/api/admin/discounts/${productId}`, formData, {
                headers: {
                    
                    Authorization: `Bearer ${token}`,
                    'x-refresh-token': refreshToken
                }
            });
            console.log('Updated Product:', response.data);
            setFormData({
                code: product.code,
                discountPercentage: product.discountPercentage,
                startDate: product.startDate,
                endDate: product.endDate,
                quantity: product.quantity,
            });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleCancel = () => {
        setSelectedProductId(null);
    };

    return (
        <Form className="product-form" noValidate onSubmit={handleSubmitForm}>
            <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationFormik101">
                    <Form.Label>Discount Code</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={formData.code}
                        onChange={handleChange}
                        isInvalid={errors.code}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.code}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="validationFormik102">
                    <Form.Label>Discount Percentage</Form.Label>
                    <Form.Control
                        type="number"
                        name="price"
                        value={formData.discountPercentage}
                        onChange={handleChange}
                        isInvalid={errors.discountPercentage}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.discountPercentage}
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>

            <Row>
                <Form.Group as={Col} md="4" controlId="validationFormik103">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    isInvalid={errors.startDate}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.startDate}
                </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationFormik104">
                <Form.Label>End Date</Form.Label>
                <Form.Control
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    isInvalid={errors.endDate}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.endDate}
                </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationFormik105">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    isInvalid={errors.quantity}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.quantity}
                </Form.Control.Feedback>
                </Form.Group>
            </Row>

            <Button className='product-form-group' type="submit">Update Product</Button>
            <Button className='product-form-group' type="button" onClick={handleCancel}>Cancel</Button>
        </Form>
    );
}

export default EditDiscountForm;
