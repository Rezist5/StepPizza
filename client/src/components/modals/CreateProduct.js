import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { createProduct } from '../../http/productApi';

const CreateProduct = ({ show, onHide }) => {
    const [product, setProduct] = useState({
        name: '',
        price: '',
        type: '',
        info: ''
    });
    const [image, setImage] = useState(null); 
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('name', product.name);
            formData.append('price', product.price);
            formData.append('type', product.type);
            formData.append('info', product.info);
            if (image) {
                formData.append('image', image); 
            }

            await createProduct(formData); 
            onHide();
        } catch (err) {
            setError('Failed to create product');
        }
    };

    const handleFileChange = (e) => {
        setImage(e.target.files[0]); 
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Create Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formProductName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter product name"
                            value={product.name}
                            onChange={(e) => setProduct({ ...product, name: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group controlId="formProductPrice">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter product price"
                            value={product.price}
                            onChange={(e) => setProduct({ ...product, price: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group controlId="formProductType">
                        <Form.Label>Type</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter product type"
                            value={product.type}
                            onChange={(e) => setProduct({ ...product, type: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group controlId="formProductInfo">
                        <Form.Label>Info</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter product info"
                            value={product.info}
                            onChange={(e) => setProduct({ ...product, info: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group controlId="formProductImage">
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange} 
                        />
                    </Form.Group>
                    {error && <p className="text-danger">{error}</p>}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Create Product
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateProduct;
