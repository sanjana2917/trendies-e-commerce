
import React, { createContext, useState, useEffect } from 'react';
import all_product from '../Components/assets/all_products';

export const ShopContext = createContext(null);

// Default cart
const getDefaultCart = () => {
    const cart = {};

    for (let index = 0; index < all_product.length; index++) {
        cart[all_product[index].id] = 0;
    }

    return cart;
};

// Load saved product quantities
const getSavedCart = () => {
    try {
        const savedCart = localStorage.getItem('shop-cart');

        if (savedCart) {
            return {
                ...getDefaultCart(),
                ...JSON.parse(savedCart)
            };
        }
    } catch (error) {
        console.log('Cart loading error:', error);
    }

    return getDefaultCart();
};

// Load saved size-wise quantities
const getSavedVariants = () => {
    try {
        const savedVariants = localStorage.getItem('shop-cart-variants');

        if (savedVariants) {
            return JSON.parse(savedVariants);
        }
    } catch (error) {
        console.log('Cart size loading error:', error);
    }

    return {};
};

const ShopContextProvider = (props) => {

    const [cartItems, SetCartItems] = useState(getSavedCart);
    const [cartVariants, setCartVariants] = useState(getSavedVariants);

    const [isLoggedIn, setIsLoggedIn] = useState(
        !!localStorage.getItem('token')
    );

    // Save product quantities
    const saveCart = (updatedCart) => {
        SetCartItems(updatedCart);

        localStorage.setItem(
            'shop-cart',
            JSON.stringify(updatedCart)
        );
    };

    // Save size-wise quantities
    const saveVariants = (updatedVariants) => {
        setCartVariants(updatedVariants);

        localStorage.setItem(
            'shop-cart-variants',
            JSON.stringify(updatedVariants)
        );
    };

    // Login and logout events
    useEffect(() => {

        const handleLogin = () => {
            setIsLoggedIn(true);
            SetCartItems(getSavedCart());
            setCartVariants(getSavedVariants());
        };

        const handleLogout = () => {
            setIsLoggedIn(false);
            SetCartItems(getSavedCart());
            setCartVariants(getSavedVariants());
        };

        window.addEventListener('loginStatusChanged', handleLogin);
        window.addEventListener('logoutStatusChanged', handleLogout);

        return () => {
            window.removeEventListener('loginStatusChanged', handleLogin);
            window.removeEventListener('logoutStatusChanged', handleLogout);
        };

    }, []);

    // Add product with selected size
    const AddToCart = (itemId, selectedSize) => {

        if (!selectedSize) {
            return false;
        }

        // Product-level quantity
        const updatedCart = {
            ...cartItems,
            [itemId]: (cartItems[itemId] || 0) + 1
        };

        // Size-level quantity
        const variantKey = `${itemId}_${selectedSize}`;

        const updatedVariants = {
            ...cartVariants,
            [variantKey]: (cartVariants[variantKey] || 0) + 1
        };

        saveCart(updatedCart);
        saveVariants(updatedVariants);

        return !!localStorage.getItem('token');
    };

    // Remove one quantity of a particular size
    const removeFromCart = (itemId, selectedSize) => {

        const variantKey = `${itemId}_${selectedSize}`;
        const currentVariantQuantity = cartVariants[variantKey] || 0;

        if (selectedSize && currentVariantQuantity > 0) {

            const updatedVariants = {
                ...cartVariants,
                [variantKey]: currentVariantQuantity - 1
            };

            if (updatedVariants[variantKey] <= 0) {
                delete updatedVariants[variantKey];
            }

            const updatedCart = {
                ...cartItems,
                [itemId]: Math.max(
                    0,
                    (cartItems[itemId] || 0) - 1
                )
            };

            saveVariants(updatedVariants);
            saveCart(updatedCart);

        } else if (!selectedSize) {

            // Support old cart items without a saved size
            const updatedCart = {
                ...cartItems,
                [itemId]: Math.max(
                    0,
                    (cartItems[itemId] || 0) - 1
                )
            };

            saveCart(updatedCart);
        }
    };

    // Total cart amount
    const getTotalCartAmount = () => {

        let totalAmount = 0;

        for (const item in cartItems) {

            if (cartItems[item] > 0) {

                const itemInfo = all_product.find(
                    (product) => product.id === Number(item)
                );

                if (itemInfo) {
                    totalAmount +=
                        itemInfo.new_price * cartItems[item];
                }
            }
        }

        return totalAmount;
    };

    // Total cart quantity
    const getTotalCartItems = () => {

        if (!isLoggedIn) return 0;

        let totalItem = 0;

        for (const item in cartItems) {
            totalItem += cartItems[item];
        }

        return totalItem;
    };

    const ContextValue = {
        getTotalCartItems,
        getTotalCartAmount,
        all_product,
        cartItems: isLoggedIn ? cartItems : getDefaultCart(),
        cartVariants: isLoggedIn ? cartVariants : {},
        AddToCart,
        removeFromCart,
        isLoggedIn
    };

    return (
        <ShopContext.Provider value={ContextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
