import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Col, Row } from 'react-bootstrap';
import "./AddProduct.css"

function EditProductForm({ productId, setSelectedProductId, product }) {
    const [formData, setFormData] = useState({
        name: product.name,
        price: product.price,
        category: product.category,
        brand: product.brand,
        quantity: product.quantity,
        typeOf: product.typeOf,
        description: product.description,
        size: product.size,
        photos: product.photos,
    });
    console.log('formData',formData)
    const [uploadedPhotos, setUploadedPhotos] = useState([]);
    const [errors, setErrors] = useState({});


    const handleChange = (e) => {
        const { name, value } = e.target;
        const newValue = name === "price" || name === "quantity" ? parseInt(value) : value;
        setFormData({ ...formData, [name]: newValue });
    };

    const handleSizeChange = (e) => {
        const { value } = e.target;
        const sizes = value.split(',').map(size => size.trim());
        setFormData({ ...formData, size: sizes });
    };

    const handleFileUpload = async (event) => {
        if (event && event.target && event.target.files) {
            const files = Array.from(event.target.files);
            for (const file of files) {
                try {
                    const formData = new FormData();
                    formData.append('file', file);
                    formData.append('upload_preset', 'zyyr22vm');
                    formData.append('cloud_name', 'derrbbxue');
                    const response = await axios.post(`https://api.cloudinary.com/v1_1/derrbbxue/image/upload`, formData);
                    const uploadedPhotoURL = response.data.secure_url;
                    setUploadedPhotos(prevPhotos => [...prevPhotos, uploadedPhotoURL]);
                } catch (error) {
                    console.error('Error uploading file:', error);
                }
            }
        }
    };
    console.log("photo",formData.photos)
    const handleSubmitForm = async (event) => {
        event.preventDefault();
        console.log(formData.photos)
        formData.photos.push(...uploadedPhotos);
        console.log('formData',formData.photos)
        try {
            const response = await axios.put(`https://shopquanao-c8p2.onrender.com/api/admin/Products/${productId}`, formData);
            console.log('Updated Product:', response.data);
            setFormData({
                name: product.name,
                price: product.price,
                category: product.category,
                brand: product.brand,
                quantity: product.quantity,
                typeOf: product.typeOf,
                description: product.description,
                size: product.size,
                photos: product.photos,
            });

            alert("Sửa sản phẩm thành công")
            setUploadedPhotos([]);
            // setSelectedProductId(null);
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
                <Form.Group as={Col} md="4" controlId="validationFormik101">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        isInvalid={errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.name}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="4" controlId="validationFormik102">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        isInvalid={errors.price}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.price}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="4" controlId="validationFormik103">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        isInvalid={errors.category}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.category}
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>

            <Row>
                <Form.Group as={Col} md="4" controlId="validationFormik104">
                    <Form.Label>Brand</Form.Label>
                    <Form.Control
                        type="text"
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        isInvalid={errors.brand}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.brand}
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

                <Form.Group as={Col} md="4" controlId="validationFormik106">
                    <Form.Label>Type</Form.Label>
                    <Form.Control
                        type="text"
                        name="typeOf"
                        value={formData.typeOf}
                        onChange={handleChange}
                        isInvalid={errors.typeOf}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.typeOf}
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>

            <Form.Group as={Col} md="12" controlId="validationFormik107">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as="textarea"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    isInvalid={errors.description}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.description}
                </Form.Control.Feedback>
            </Form.Group>

            <Row>
                <Form.Group as={Col} md="6" className="position-relative">
                    <Form.Label>Size (separate by comma)</Form.Label>
                    <Form.Control
                        type="text"
                        name="size"
                        value={formData.size.join(',')}
                        onChange={handleSizeChange}
                        isInvalid={errors.size}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.size}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="6" className="position-relative">
                    <Form.Label>Photos (separate by comma)</Form.Label>
                    <Form.Control
                        type="file"
                        name="photos"
                        onChange={handleFileUpload}
                        multiple
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.photos}
                    </Form.Control.Feedback>
                    <div>
                        {formData.photos.map((photoURL, index) => (
                            <img key={index} src={photoURL} alt={`Uploaded Photo ${index}`} />
                        ))}
                    </div>
                </Form.Group>
            </Row>

            <Button className='product-form-group' type="submit">Update Product</Button>
            <Button className='product-form-group' type="button" onClick={handleCancel}>Cancel</Button>
        </Form>
    );
}

export default EditProductForm;
