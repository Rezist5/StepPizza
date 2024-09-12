import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProducts } from '../http/productApi';
import { fetchCombos } from '../http/comboApi';  
import CategoryList from '../components/CategoryList';
import ProductsList from '../components/ProductsList';
import ComboCarousel from '../components/ComboCarousel';
import { createCart, addToCart as apiAddToCart } from '../http/cartApi'; 
import { Context } from '../index';

const MainPage = () => {
    const [products, setProducts] = useState([]);
    const [types, setTypes] = useState([]);
    const [selectedType, setSelectedType] = useState('');
    const [cart, setCart] = useState([]);
    const [combos, setCombos] = useState([]); 
    const { user } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        const loadProductsAndCombos = async () => {
            try {
                const fetchedProducts = await fetchProducts();
                const productTypes = Array.from(new Set(fetchedProducts.map(product => product.type)));
                setTypes(productTypes);

                const filteredProducts = selectedType
                    ? fetchedProducts.filter(product => product.type === selectedType)
                    : fetchedProducts;

                setProducts(filteredProducts);

                const fetchedCombos = await fetchCombos(); 
                setCombos(fetchedCombos);
            } catch (err) {
                console.error('Error fetching products and combos:', err);
            }
        };

        loadProductsAndCombos();
    }, [selectedType]);

    const addToCart = async (product, sizeId, quantity) => {
        try {
            const userId = user.id;

            let activeCart = await getActiveCart(userId);
            if (!activeCart) {
                const newCart = await createNewCart(userId);
                setCartId(newCart.id);
                activeCart = newCart;
            } else {
                setCartId(activeCart.id);
            }

            const { id: productId, price } = product;
            await apiAddToCart(activeCart.id, productId, sizeId, quantity);

            setCart((prevCart) => [...prevCart, { ...product, sizeId, quantity, price }]);

        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    const handleCheckout = () => {
        navigate('/cart', { state: { cart } });
    };

    return (
        <div>
            <h2>Combos</h2>
            <ComboCarousel combos={combos} /> 
            <CategoryList 
                types={types} 
                selectedType={selectedType} 
                onSelectType={setSelectedType} 
            />
            <ProductsList 
                products={products} 
                addToCart={addToCart} 
            />
            <button onClick={handleCheckout}>Go to Cart</button>
        </div>
    );
};

export default MainPage;
