import React from 'react';
import ProductItem from './ProductItem';

const ProductsList = ({ products, addToCart }) => {
    const groupProductsByType = () => {
        return products.reduce((acc, product) => {
            if (!acc[product.type]) {
                acc[product.type] = [];
            }
            acc[product.type].push(product);
            return acc;
        }, {});
    };

    const groupedProducts = groupProductsByType();

    return (
        <div>
            {Object.keys(groupedProducts).map((type) => (
                <div key={type}>
                    <h2>{type.charAt(0).toUpperCase() + type.slice(1)}</h2>
                    <ul>
                        {groupedProducts[type].map((product) => (
                            <ProductItem key={product.id} product={product} addToCart={addToCart} />
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default ProductsList;
