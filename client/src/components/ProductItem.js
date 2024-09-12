import React, { useState } from 'react';
import ProductModal from './ProductModal';

const ProductItem = ({ product, addToCart }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div>
                <h3>{product.name}</h3>
                <p>Price: {product.price}</p>
                <button onClick={handleOpenModal}>Details</button>
            </div>
            {isModalOpen && (
                <ProductModal
                    product={product}
                    onClose={handleCloseModal}
                    addToCart={addToCart}
                />
            )}
        </>
    );
};

export default ProductItem;
