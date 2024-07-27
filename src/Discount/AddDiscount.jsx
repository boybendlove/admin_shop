import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';
import axios from 'axios';
import "./AddDiscount.css";

function AddDiscountForm() {
  const token = sessionStorage.getItem("token");
  const refreshToken = sessionStorage.getItem("refreshToken");

  const [formData, setFormData] = useState({
    code: '',
    discountPercentage: 0,
    startDate: '',
    endDate: '',
    quantity: 0
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "discountPercentage" || name === "quantity" ? parseInt(value) : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của form
    console.log('token:', token);
    console.log('formData:', formData);
    try {
      // Gửi yêu cầu POST đến API để lưu thông tin sản phẩm
      const response = await axios.post('https://shopquanao-c8p2.onrender.com/api/admin/discounts', formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'x-refresh-token': refreshToken
        }
    });;
      console.log('Response:', response.data);
      // Xử lý phản hồi từ máy chủ nếu cần
      // Reset form data
      setFormData({
        code: '',
        discountPercentage: 0,
        startDate: '',
        endDate: '',
        quantity: 0
      });
      // Xử lý phản hồi từ máy chủ nếu cần
    } catch (error) {
      console.error('Error:', error);
      // Xử lý lỗi nếu có
    }
  };

  return (
    <Form className="product-form" noValidate onSubmit={handleSubmitForm}>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationFormik101">
          <Form.Label>Discount Code</Form.Label>
          <Form.Control
            type="text"
            name="code"
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
            name="discountPercentage"
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
      <Button className='product-form-group' type="submit">Submit form</Button>
    </Form>
  );
}

export default AddDiscountForm;
