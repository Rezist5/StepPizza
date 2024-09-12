import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { createCombo } from '../../http/comboApi';
import { fetchProducts } from '../../http/productApi'; 

const CreateCombo = ({ show, onHide }) => {
    const [comboData, setComboData] = useState({ name: '', description: '', products: [] });
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [imageFile, setImageFile] = useState(null); 
    const [error, setError] = useState('');

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchProducts();
                setProducts(data);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        };
        if (show) {
            loadProducts();
        }
    }, [show]);

    const handleProductSelect = (productId) => {
        if (selectedProducts.includes(productId)) {
            setSelectedProducts(selectedProducts.filter(id => id !== productId));
        } else {
            setSelectedProducts([...selectedProducts, productId]);
        }
    };

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('name', comboData.name);
            formData.append('description', comboData.description);
            formData.append('products', JSON.stringify(selectedProducts));
            if (imageFile) {
                formData.append('image', imageFile); ь
            }

            await createCombo(formData); 
            onHide();
        } catch (err) {
            setError('Failed to create combo');
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Create Combo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formComboName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter combo name"
                            value={comboData.name}
                            onChange={(e) => setComboData({ ...comboData, name: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group controlId="formComboDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter combo description"
                            value={comboData.description}
                            onChange={(e) => setComboData({ ...comboData, description: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group controlId="formComboProducts">
                        <Form.Label>Select Products</Form.Label>
                        {products.length > 0 ? (
                            <div>
                                {products.map(product => (
                                    <Form.Check
                                        key={product.id}
                                        type="checkbox"
                                        label={product.name}
                                        checked={selectedProducts.includes(product.id)}
                                        onChange={() => handleProductSelect(product.id)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <p>No products available</p>
                        )}
                    </Form.Group>
                    <Form.Group controlId="formComboImage">
                        <Form.Label>Upload Image</Form.Label>
                        <Form.Control
                            type="file"
                            onChange={handleImageChange} // Добавляем обработчик для загрузки изображения
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
                    Create Combo
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateCombo;
