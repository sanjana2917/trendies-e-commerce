
import React, { useState } from 'react';
import './Css/LoginSignup.css';
import { useNavigate, useLocation } from 'react-router-dom';

export const LoginSignup = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!formData.email || !formData.password) {
      setMessage('Please enter email and password');
      return;
    }

    if (!isLogin && !formData.name.trim()) {
      setMessage('Please enter your name');
      return;
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setMessage('Password must contain at least 8 characters');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        isLogin
          ? 'http://localhost:5000/api/auth/login'
          : 'http://localhost:5000/api/auth/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(
            isLogin
              ? {
                  email: formData.email,
                  password: formData.password
                }
              : {
                  name: formData.name,
                  email: formData.email,
                  password: formData.password
                }
          )
        }
      );

      const data = await response.json();

      if (!response.ok) {

        if (
          !isLogin &&
          (response.status === 400 || response.status === 409) &&
          data.message?.toLowerCase().includes('already')
        ) {
          setIsLogin(true);

          setFormData({
            name: '',
            email: formData.email,
            password: '',
            confirmPassword: ''
          });

          setMessage('Account already exists. Please login.');
          return;
        }

        throw new Error(data.message || 'Something went wrong');
      }

      if (isLogin) {

        if (!data.token) {
          throw new Error('Login token not received from server');
        }

        // Save login token
        localStorage.setItem('token', data.token);

        // Save logged-in user email
        localStorage.setItem('user', JSON.stringify({
          email: formData.email
        }));

        // Update Navbar Login button to Logout
        window.dispatchEvent(new Event('loginStatusChanged'));

        setMessage('Login successful!');

        const savedCart = localStorage.getItem('shop-cart');

        if (savedCart) {
          console.log('Cart restored:', JSON.parse(savedCart));
        }

        const redirectPath =
          location.state?.from?.pathname || '/';

        navigate(redirectPath, { replace: true });

      } else {

        setMessage('Account created successfully! Please login.');

        setIsLogin(true);

        setFormData({
          name: '',
          email: formData.email,
          password: '',
          confirmPassword: ''
        });
      }

    } catch (error) {
      setMessage(error.message || 'Server connection failed');
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setMessage('');

    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  return (
    <div className="loginsignup">

      <form
        className="loginsignup-container"
        onSubmit={handleSubmit}
      >

        <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>

        <p className="loginsignup-subtitle">
          {isLogin
            ? 'Welcome back to Shopora!'
            : 'Create your Shopora account'}
        </p>

        <div className="loginsignup-fields">

          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            minLength="8"
            required
          />

          {!isLogin && (
            <input
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              minLength="8"
              required
            />
          )}

        </div>

        <label className="password-toggle">
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          Show password
        </label>

        {!isLogin && (
          <div className="loginsignup-agree">
            <input type="checkbox" required />
            <p>
              By continuing, I agree to the terms of use
              and privacy policy.
            </p>
          </div>
        )}

        {message && (
          <p className="auth-message" role="status">
            {message}
          </p>
        )}

        <button type="submit" disabled={loading}>
          {loading
            ? 'Please wait...'
            : isLogin
              ? 'Login'
              : 'Create Account'}
        </button>

        <p className="loginsignup-login">
          {isLogin
            ? "Don't have an account?"
            : 'Already have an account?'}

          <span onClick={switchMode}>
            {isLogin ? 'Create account' : 'Login here'}
          </span>
        </p>

      </form>
    </div>
  );
};
