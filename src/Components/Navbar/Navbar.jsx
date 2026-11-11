
import React, { useContext, useState, useEffect } from 'react'
import './Navbar.css'

import logo from '../assets/logo.png'
import cart_icon from '../assets/carticons.png'
import menuIcon from '../assets/list.png'
import closeIcon from '../assets/cancel.png'
import { Link, useNavigate } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'

export const Navbar = () => {

    const [activeMenu, setActiveMenu] = useState("shop")
    const [openMenu, setOpenMenu] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(
        !!localStorage.getItem("token")
    )

    const { getTotalCartItems } = useContext(ShopContext);
    const navigate = useNavigate();

    useEffect(() => {
    const updateLoginStatus = () => {
        setIsLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener("loginStatusChanged", updateLoginStatus);

    return () => {
        window.removeEventListener("loginStatusChanged", updateLoginStatus);
    };
}, []);

    const closeNavbar = (menuName) => {
        setActiveMenu(menuName)
        setOpenMenu(false)
    }

   const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("auth-token");

    window.dispatchEvent(new Event("logoutStatusChanged"));

    setIsLoggedIn(false);
    navigate('/login');
};

    return (
        <div className='navbar'>

            {/* Logo */}

            <div className='nav-logo'>
                <img src={logo} alt="Trendora Logo" />
                <p>TRENDORA</p>
            </div>

            {/* Navigation Menu */}

            <ul className={`nav-menu ${openMenu ? 'active' : ''}`}>

                <li onClick={() => closeNavbar("shop")}>
                    <Link to='/'>Shop</Link>
                    {activeMenu === "shop" && <hr />}
                </li>

                <li onClick={() => closeNavbar("mens")}>
                    <Link to='/mens'>Men</Link>
                    {activeMenu === "mens" && <hr />}
                </li>

                <li onClick={() => closeNavbar("womens")}>
                    <Link to='/womens'>Women</Link>
                    {activeMenu === "womens" && <hr />}
                </li>

                <li onClick={() => closeNavbar("kids")}>
                    <Link to='/kids'>Kids</Link>
                    {activeMenu === "kids" && <hr />}
                </li>

            </ul>

            {/* Login / Logout and Cart */}

            <div className="nav-login-cart">

                {isLoggedIn ? (
                    <button onClick={handleLogout}>Logout</button>
                ) : (
                    <Link to='/login'>
                        <button>Login</button>
                    </Link>
                )}

                <Link to='/cart' className="nav-cart">
                    <img src={cart_icon} alt="Cart" />
                    <div className="nav-cart-count">
                        {getTotalCartItems()}
                    </div>
                </Link>

            </div>

            {/* Hamburger Icon */}

            <div className="nav-mobile-icons">

                <img
                    onClick={() => setOpenMenu(true)}
                    src={menuIcon}
                    alt="Open Menu"
                    className="menu-icon"
                />

                <img
                    onClick={() => setOpenMenu(false)}
                    src={closeIcon}
                    alt="Close Menu"
                    className="close-icon"
                />

            </div>

        </div>
    )
}
