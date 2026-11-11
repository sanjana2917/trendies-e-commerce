
import express from 'express';
import Cart from '../Models/Cart.js';
import authMiddleware from '../Middleware/authMiddleware.js';

const router = express.Router();

// GET USER CART
router.get('/', authMiddleware, async (req, res) => {

    try {

        let cart = await Cart.findOne({
            userId: req.userId
        });

        if (!cart) {
            cart = await Cart.create({
                userId: req.userId,
                items: []
            });
        }

        return res.status(200).json({
            message: 'Cart fetched successfully',
            cart: cart.items
        });

    } catch (error) {

        console.error('Get cart error:', error);

        return res.status(500).json({
            message: 'Unable to fetch cart'
        });

    }
});


// SYNC GUEST CART AFTER LOGIN
router.post('/sync', authMiddleware, async (req, res) => {

    try {

        const guestCart = req.body.items || [];

        let cart = await Cart.findOne({
            userId: req.userId
        });

        if (!cart) {
            cart = new Cart({
                userId: req.userId,
                items: []
            });
        }

        // Merge guest cart with existing user cart
        guestCart.forEach((guestItem) => {

            const productId = Number(guestItem.productId);
            const quantity = Number(guestItem.quantity);

            if (
                !Number.isInteger(productId) ||
                !Number.isInteger(quantity) ||
                quantity <= 0
            ) {
                return;
            }

            const existingItem = cart.items.find(
                item => item.productId === productId
            );

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.items.push({
                    productId,
                    quantity
                });
            }

        });

        await cart.save();

        return res.status(200).json({
            message: 'Cart synced successfully',
            cart: cart.items
        });

    } catch (error) {

        console.error('Cart sync error:', error);

        return res.status(500).json({
            message: 'Unable to sync cart'
        });

    }
});


// ADD PRODUCT TO USER CART
router.post('/add', authMiddleware, async (req, res) => {

    try {

        const productId = Number(req.body.productId);

        if (!Number.isInteger(productId)) {
            return res.status(400).json({
                message: 'Invalid product ID'
            });
        }

        let cart = await Cart.findOne({
            userId: req.userId
        });

        if (!cart) {
            cart = new Cart({
                userId: req.userId,
                items: []
            });
        }

        const existingItem = cart.items.find(
            item => item.productId === productId
        );

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.items.push({
                productId,
                quantity: 1
            });
        }

        await cart.save();

        return res.status(200).json({
            message: 'Product added successfully',
            cart: cart.items
        });

    } catch (error) {

        console.error('Add cart error:', error);

        return res.status(500).json({
            message: 'Unable to add product'
        });

    }
});


// REMOVE ONE QUANTITY
router.post('/remove', authMiddleware, async (req, res) => {

    try {

        const productId = Number(req.body.productId);

        const cart = await Cart.findOne({
            userId: req.userId
        });

        if (!cart) {
            return res.status(404).json({
                message: 'Cart not found'
            });
        }

        const existingItem = cart.items.find(
            item => item.productId === productId
        );

        if (existingItem) {

            existingItem.quantity -= 1;

            if (existingItem.quantity <= 0) {
                cart.items = cart.items.filter(
                    item => item.productId !== productId
                );
            }

        }

        await cart.save();

        return res.status(200).json({
            message: 'Cart updated successfully',
            cart: cart.items
        });

    } catch (error) {

        console.error('Remove cart error:', error);

        return res.status(500).json({
            message: 'Unable to update cart'
        });

    }
});

export default router;
