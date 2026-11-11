
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../Models/User.js';

const router = express.Router();

// SIGNUP
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: 'Please fill all fields'
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                message: 'Password must be at least 8 characters'
            });
        }

        // Convert email to lowercase and remove extra spaces
        const normalizedEmail = email.trim().toLowerCase();

        // CHECK WHETHER EMAIL ALREADY EXISTS
        const existingUser = await User.findOne({
            email: normalizedEmail
        });

        if (existingUser) {
            return res.status(409).json({
                message: 'Email already registered. Please login.'
            });
        }

        // HASH PASSWORD
        const hashedPassword = await bcrypt.hash(password, 12);

        // CREATE NEW USER
        const newUser = await User.create({
            name: name.trim(),
            email: normalizedEmail,
            password: hashedPassword
        });

        const token = jwt.sign(
            { userId: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        return res.status(201).json({
            message: 'Account created successfully',
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });

    } catch (error) {
        // Handle duplicate email if two signup requests happen together
        if (error.code === 11000) {
            return res.status(409).json({
                message: 'Email already registered. Please login.'
            });
        }

        console.error('Signup error:', error);

        return res.status(500).json({
            message: 'Signup failed. Please try again.'
        });
    }
});

// LOGIN
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: 'Please enter email and password'
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const user = await User.findOne({
            email: normalizedEmail
        });

        if (!user) {
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        return res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error('Login error:', error);

        return res.status(500).json({
            message: 'Login failed. Please try again.'
        });
    }
});

export default router;
