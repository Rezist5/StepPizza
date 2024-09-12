import React, { useState, useEffect } from 'react';
import { fetchSizes } from '../api/sizeAPI'; 
import './ProductModal.css';

const ProductModal = ({ product, onClose, addToCart }) => {
    const [sizes, setSizes] = useState([]);
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const loadSizes = async () => {
            try {
                const fetchedSizes = await fetchSizes();
                setSizes(fetchedSizes);
            } catch (err) {
                console.error('Error fetching sizes:', err);
            }
        };

        loadSizes();
    }, []);

    const handleAddToCart = () => {
        if (selectedSize) {
            addToCart(product.id, selectedSize, quantity);
            onClose();
        } else {
            alert('Please select a size.');
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>{product.name}</h2>
                <p>Price: {product.price}</p>
                <p>{product.description}</p>
                <div>
                    <label>Size:</label>
                    <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
                        <option value="">Select Size</option>
                        {sizes.map((size) => (
                            <option key={size.id} value={size.id}>
                                {size.value}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Quantity:</label>
                    <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                    />
                </div>
                <button onClick={handleAddToCart}>Add to Cart</button>
            </div>
        </div>
    );
};

export default ProductModal;
