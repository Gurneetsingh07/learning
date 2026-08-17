import dns from "dns";
import express from "express";
import mongoose, { Mongoose } from "mongoose";
import dotenv from "dotenv";
import Product from "./models/ProductModel.js";
import User from './models/UserModel.js'
import jwt from 'jsonwebtoken'
import cors from "cors";
dns.setServers(["8.8.8.8", "1.1.1.1"]);
dotenv.config();

const app = express();
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(express.json());

console.log("Mongo URI exists:", !!process.env.MONGO_URI);

mongoose
    .connect(process.env.MONGO_URI, {
        family: 4
    })
    .then(() => {
        console.log("MongoDB connected successfully");

        app.listen(5000, () => {
            console.log("Server running on port 5000");
        });
    })
    .catch((error) => {
        console.log("MongoDB connection error:");
        console.log(error);
    });



app.post('/signup', async (req, res) => {
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
});

app.post('/login', async (req, res) => {
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
})

app.post('/logout', (req, res) => {
    res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "lax",
        secure: false
    });
    res.status(200).json({ message: "Logout successful" });
});


app.get('/products', async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const products = await Product.find()
        .skip(startIndex)
        .limit(limit);
    const productsLength = await Product.countDocuments();
    res.json({
        products: products,
        productsLength: productsLength,
        currentPage: page,
        totalPages: Math.ceil(productsLength / limit)
    });
});

app.post('/products/addProducts', async (req, res) => {
    const newProduct = new Product({
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        rating: req.body.rating,
        stock: req.body.stock,
        image: req.body.image,
    });
    const response = await newProduct.save()
    res.json(response);
});
app.get('/products/search', async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search;
    const startIndex = (page - 1) * limit;
    const productsbyName = await Product.find({
        name: { $regex: `^${search}`, $options: "i" }
    })
        .skip(startIndex)
        .limit(limit);
    res.json({
        products: productsbyName,
        productsLength: productsbyName.length,
        totalPages: Math.ceil(productsbyName.length / limit)
    });
});

app.patch("/product/:id", async (req, res) => {
    const id = req.params.id;
    const product = await Product.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
    );
    res.json(product);
});

app.put("/product/:id", async (req, res) => {
    const id = req.params.id;
    const product = await Product.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
    );
    res.json(product);
});


