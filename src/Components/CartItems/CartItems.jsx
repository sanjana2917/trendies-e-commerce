
import React, { useContext } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import close from '../assets/cancel.png';
import { useNavigate } from 'react-router-dom';

export const CartItems = () => {
  const {
    getTotalCartAmount,
    all_product,
    cartItems,
    cartVariants,
    removeFromCart,
    isLoggedIn
  } = useContext(ShopContext);

  const navigate = useNavigate();

  const handleCheckout = () => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Please login to continue checkout');
      navigate('/login');
    } else {
      navigate('/checkout');
    }
  };

  // Prepare cart rows with individual sizes
  const cartRows = [];

  if (isLoggedIn && all_product) {
    const variantEntries = Object.entries(cartVariants || {})
      .filter(([, quantity]) => Number(quantity) > 0);

    const variantProductIds = new Set();

    variantEntries.forEach(([key, quantity]) => {
      const separatorIndex = key.lastIndexOf('_');
      const productId = key.substring(0, separatorIndex);
      const size = key.substring(separatorIndex + 1);

      const product = all_product.find(
        (item) => String(item.id) === productId
      );

      if (product && separatorIndex !== -1) {
        variantProductIds.add(productId);

        cartRows.push({
          product,
          size,
          quantity: Number(quantity),
          key,
          isVariant: true
        });
      }
    });

    // Support older cart items without size information
    all_product.forEach((product) => {
      const quantity = Number(cartItems?.[product.id] || 0);

      if (
        quantity > 0 &&
        !variantProductIds.has(String(product.id))
      ) {
        cartRows.push({
          product,
          size: '—',
          quantity,
          key: `legacy_${product.id}`,
          isVariant: false
        });
      }
    });
  }

  return (
    <div className="cartitems">

      <div className="cartitems-table-wrap">
        <div className="cartitems-format-main">
          <p>Products</p>
          <p>Title</p>
          <p>Size</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>

        <hr />

        {isLoggedIn && cartRows.map((row) => (
          <div key={row.key}>
            <div className="cartitems-format cartitems-format-main">

              <img
                src={row.product.image}
                alt={row.product.name}
                className="cart-product-icon"
              />

              <p className="cart-product-name">
                {row.product.name}
              </p>

              <p className="cartitems-size">
                {row.size}
              </p>

              <p>${row.product.new_price}</p>

              <span className="cartitems-quantity">
                {row.quantity}
              </span>

              <p>
                ${(Number(row.product.new_price) * row.quantity).toFixed(2)}
              </p>

              <img
                className="cartitems-remove-icon"
                src={close}
                onClick={() => {
                  if (row.isVariant) {
                    removeFromCart(row.product.id, row.size);
                  } else {
                    removeFromCart(row.product.id);
                  }
                }}
                alt="Remove item"
                title="Remove item"
              />

            </div>
            <hr />
          </div>
        ))}

        {isLoggedIn && cartRows.length === 0 && (
          <p className="empty-cart">
            Your cart is empty!
          </p>
        )}

        {!isLoggedIn && (
          <p className="empty-cart">
            Please login to view your cart.
          </p>
        )}
      </div>

      <div className="cartitems-down">

        <div className="cartitems-total">
          <h1>Cart Totals</h1>

          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>${isLoggedIn ? getTotalCartAmount().toFixed(2) : '0.00'}</p>
            </div>

            <hr />

            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>

            <hr />

            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${isLoggedIn ? getTotalCartAmount().toFixed(2) : '0.00'}</h3>
            </div>
          </div>

          <button onClick={handleCheckout}>
            PROCEED TO CHECKOUT
          </button>
        </div>

        <div className="cartitems-promocode">
          <p>If you have a Promocode, Enter it here</p>

          <div className="cartitems-promobox">
            <input
              type="text"
              placeholder="Enter Promo code"
            />
            <button>Submit</button>
          </div>
        </div>

      </div>
    </div>
  );
};
