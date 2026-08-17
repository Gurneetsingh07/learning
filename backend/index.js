import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js"
import productRoutes from "./routes/productRoutes.js"

dotenv.config();

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use(express.json());

app.use("/user", userRoutes);
app.use("/products", productRoutes);

console.log("Mongo URI exists:", !!process.env.MONGO_URI);

connectDB().then(() => {
    app.listen(5000, () => {
        console.log("Server running on port 5000");
    });
});