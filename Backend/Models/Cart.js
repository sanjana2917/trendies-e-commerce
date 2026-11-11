
import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },

    items: [
        {
            productId: {
                type: Number,
                required: true
            },

            quantity: {
                type: Number,
                default: 0,
                min: 0
            }
        }
    ]

}, { timestamps: true });

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
