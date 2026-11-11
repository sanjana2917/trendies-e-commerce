
import React, { useContext, useState } from 'react';
import './Productdisplay.css';
import starfill from '../assets/star.png';
import stardull from '../assets/stardull.png';
import { ShopContext } from '../../Context/ShopContext';
import { useNavigate } from 'react-router-dom';

export const Productdisplay = (props) => {
    const { product } = props;

    const { AddToCart } = useContext(ShopContext);
    const navigate = useNavigate();

    const [selectedSize, setSelectedSize] = useState('');

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert('Please select a size');
            return;
        }

        // Pass both product ID and selected size
        const success = AddToCart(product.id, selectedSize);

        if (!success) {
            navigate('/login', {
                state: {
                    from: { pathname: '/cart' }
                }
            });
            return;
        }

        navigate('/cart');
    };

    return (
        <div className="productdisplay">

            <div className="productdisplay-left">

                <div className="productdisplay-img-list">
                    <img src={product.image} alt={product.name} />
                    <img src={product.image} alt={product.name} />
                    <img src={product.image} alt={product.name} />
                    <img src={product.image} alt={product.name} />
                </div>

                <div className="productdisplay-img">
                    <img
                        className="productdisplay-main-img"
                        src={product.image}
                        alt={product.name}
                    />
                </div>

            </div>

            <div className="productdisplay-right">

                <h1>{product.name}</h1>

                <div className="productdisplay-right-star">
                    <img src={starfill} alt="Star" />
                    <img src={starfill} alt="Star" />
                    <img src={starfill} alt="Star" />
                    <img src={starfill} alt="Star" />
                    <img src={stardull} alt="Star" />
                    <p>(125)</p>
                </div>

                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-prices-old">
                        ${product.old_price}
                    </div>

                    <div className="productdisplay-right-prices-new">
                        ${product.new_price}
                    </div>
                </div>

                <div className="productdisplay-right-description">
                    Discover the perfect blend of style, comfort, and quality
                    with our latest fashion collection. Designed with trendy
                    patterns and premium fabrics to give you a stylish look
                    every day. Perfect for casual wear, parties, and special
                    occasions.
                </div>

                <div className="productdisplay-right-size">
                    <h1>Select size</h1>

                    <div className="productdisplay-right-sizes">
                        {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                            <button
                                type="button"
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={
                                    selectedSize === size ? 'selected' : ''
                                }
                            >
                                {size}
                            </button>
                        ))}
                    </div>

                    {selectedSize && (
                        <p className="selected-size-text">
                            Selected size: <strong>{selectedSize}</strong>
                        </p>
                    )}
                </div>

                <button onClick={handleAddToCart}>
                    Add to cart
                </button>

                <p className="productdisplay-right-category">
                    <span>Category:</span>
                    Women, T-Shirt, Croptops, chudidhars
                </p>

                <p className="productdisplay-right-category">
                    <span>Tags:</span> Modern, Latest
                </p>

            </div>
        </div>
    );
};
