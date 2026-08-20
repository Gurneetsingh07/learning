import redisClient from "../config/redis.js";
import Product from "../models/ProductModel.js"

const getAllProducts = async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const cacheKey = `products:page:${page}:limit:${limit}`;
    const cachedProducts = await redisClient.get(cacheKey);
    if (cachedProducts) {
        console.log("Products sent from Redis cache");
        return res.json(JSON.parse(cachedProducts));
    }
    const startIndex = (page - 1) * limit;
    const products = await Product.find()
        .skip(startIndex)
        .limit(limit);
    const productsLength = await Product.countDocuments();
    const response = {
        products,
        productsLength,
        currentPage: page,
        totalPages: Math.ceil(productsLength / limit),
    };
    await redisClient.setEx(cacheKey, 300, JSON.stringify(response));
    res.json(response);
}

const addNewProduct = async (req, res) => {
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
}

const getSearchedProducts = async (req, res) => {
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
}

const updateProduct = async (req, res) => {
    const id = req.params.id;
    const product = await Product.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
    );
    res.json(product);
}

export {
    getAllProducts,
    addNewProduct,
    getSearchedProducts,
    updateProduct
};