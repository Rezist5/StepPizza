import React, { useEffect, useState } from 'react';
import { fetchCart } from '../api/cartAPI';  // предполагается, что у вас есть этот метод в cartAPI

const CartPage = () => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadCart = async () => {
            try {
                const fetchedCart = await fetchCart();  // Метод для получения данных корзины
                setCart(fetchedCart.cartItems);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        loadCart();
    }, []);

    if (loading) return <div>Loading cart...</div>;
    if (error) return <div>Error loading cart: {error}</div>;

    return (
        <div>
            <h1>Cart</h1>
            {cart.length > 0 ? (
                <ul>
                    {cart.map(item => (
                        <li key={item.id}>
                            {item.product.name} - {item.quantity} x ${item.price}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    );
};

export default CartPage;
