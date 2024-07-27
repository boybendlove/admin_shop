import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
// import cloudinary from 'cloudinary';
import { useState } from 'react';
import axios from 'axios';
import "./AddProduct.css"

function AddProductForm() {

 
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    category: '',
    brand: '',
    quantity: 0,
    typeOf: '',
    description: '',
    size: [],
    photos: [],
  });
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

    // Lặp qua từng ảnh và tải lên Cloudinary
    for (const file of files) {
      try {
        // Tạo một FormData để gửi yêu cầu POST
        const formData = new FormData();
        console.log('formData:', formData);
        console.log('file:', file);
        formData.append('file', file);
        formData.append('upload_preset', 'zyyr22vm'); // Thay thế 'your_upload_preset' bằng upload preset của bạn
        formData.append('cloud_name', 'derrbbxue'); // Thay thế 'your_cloud_name' bằng cloud name của bạn

        // Gửi yêu cầu POST đến Cloudinary
        const response = await axios.post(`https://api.cloudinary.com/v1_1/derrbbxue/image/upload`, formData);

        // Lấy URL của ảnh đã tải lên từ phản hồi
        const uploadedPhotoURL = response.data.secure_url;
        console.log("uploadedPhotoURL",uploadedPhotoURL)

        // Cập nhật state uploadedPhotos bằng cách thêm URL của ảnh đã tải lên
        setUploadedPhotos(prevPhotos => [...prevPhotos, uploadedPhotoURL]);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  }
};

    const handleSubmitForm = async (event) => {
      event.preventDefault(); // Ngăn chặn hành vi mặc định của form
    
      formData.photos = uploadedPhotos;
      console.log('formData:', formData);
      try {
        // Gửi yêu cầu POST đến API để lưu thông tin sản phẩm
        const response = await axios.post('https://shopquanao-c8p2.onrender.com/api/admin/Products', formData);
        console.log('Response:', response.data);
        // Xử lý phản hồi từ máy chủ nếu cần
        // Reset form data
        setFormData({
          name: '',
          price: 0,
          category: '',
          brand: '',
          quantity: 0,
          typeOf: '',
          description: '',
          size: [],
          photos: [],
        });

        alert("Thêm sản phẩm thành công")
        // Reset uploaded photos
        setUploadedPhotos([]);
        // Xử lý phản hồi từ máy chủ nếu cần
      } catch (error) {
        console.error('Error:', error);
        // Xử lý lỗi nếu có
      }
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
                    {uploadedPhotos.map((photoURL, index) => (
                      <img key={index} src={photoURL} alt={`Uploaded Photo ${index}`} />
                    ))}
                  </div>
                </Form.Group>

          </Row>
          <Button className='product-form-group' type="submit">Submit form</Button>
        </Form>

  );
}

export default AddProductForm;