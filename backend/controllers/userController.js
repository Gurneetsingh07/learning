import User from "../models/UserModel.js"
import jwt from 'jsonwebtoken'
import Product from "../models/ProductModel.js"
const signup = async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;
        if (!email || !password || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }
        const newUser = new User({ email, password });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server error during registration", error: error.message });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.cookie("jwt", token, {});
        res.status(200).json({ message: "Login successful" });
    }
    catch (error) {
        res.status(500).json({ message: "server error during login", error: error.message })
    }
}

const logout = async (req, res) => {
    res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "lax",
        secure: false
    });
    res.status(200).json({ message: "Logout successful" });
}
const addtocart = async (req, res) => {
    try {
        console.log("inside add to cart")
        const { id } = req.body
        const userId = req.user.userId;
        const user = await User.findById(userId);
        const product = await Product.findById(id);

        const cartItem = user.cart.find(
            (item) => item.product.toString() === product._id.toString()
        );
        if (cartItem) {
            cartItem.quantity += 1;
        } else {
            user.cart.push({
                product: product._id,
                name: product.name,
                category: product.category,
                price: product.price,
                rating: product.rating,
                stock: product.stock,
                image: product.image,
                quantity: 1
            });
        }
        await user.save();
        return res.status(200).json({
            message: "Product added to cart",
            cart: user.cart
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Could not add product to cart",
            error: error.message
        })
    }
}
const getcartitem = async (req, res) => {
    try {
        const userId = req.user.userId
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        return res.status(200).json({
            cart: user.cart
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Could not get cart",
            error: error.message
        });
    }
}
export {
    signup,
    login,
    logout,
    addtocart,
    getcartitem
};