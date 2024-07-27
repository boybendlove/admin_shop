import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';
import axios from 'axios';
import "./AddNotifications.css";

function AddNotificationsForm() {
  const token = sessionStorage.getItem("token");
  const refreshToken = sessionStorage.getItem("refreshToken");

  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của form
    console.log('token:', token);
    console.log('formData:', formData);
    try {
      // Gửi yêu cầu POST đến API để lưu thông tin sản phẩm
      const response = await axios.post('https://shopquanao-c8p2.onrender.com/api/notifications/admin', formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'x-refresh-token': refreshToken
        }
    });;
      console.log('Response:', response.data);
      // Xử lý phản hồi từ máy chủ nếu cần
      // Reset form data
      setFormData({
        title: '',
        content: '',
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
        <Form.Group as={Col} md="12" controlId="validationFormik101">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            isInvalid={errors.title}
          />
          <Form.Control.Feedback type="invalid">
            {errors.title}
          </Form.Control.Feedback>
        </Form.Group>
        </Row>
        <Row>
        <Form.Group as={Col} md="12" controlId="validationFormik103">
          <Form.Label>Content</Form.Label>
          <Form.Control
            type="text"
            name="content"
            value={formData.content}
            onChange={handleChange}
            isInvalid={errors.content}
          />
          <Form.Control.Feedback type="invalid">
            {errors.content}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Button className='product-form-group' type="submit">Submit form</Button>
    </Form>
  );
}

export default AddNotificationsForm;
