import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const UserModel = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    cart: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Products",
                required: true
            },
            name: {
                type: String,
                required: true
            },
            category: {
                type: String
            },
            price: {
                type: Number,
                required: true
            },
            rating: {
                type: Number
            },

            stock: {
                type: Number
            },

            image: {
                type: String
            },
            quantity: {
                type: Number,
                default: 1,
                min: 1
            },

        }
    ]
}, { timestamps: true })

UserModel.pre('save', async function (next) {
    if (!this.isModified('password')) return;

    try {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    } catch (error) {
        next(error);
    }
});

UserModel.methods.comparePassword = async function (loginGuess) {
    return await bcrypt.compare(loginGuess, this.password);
};
const User = mongoose.model('User', UserModel);
export default User;
