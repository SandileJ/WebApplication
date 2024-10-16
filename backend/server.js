import express from "express";
import dotenv from "dotenv";
import productRoutes from "./routes/product.routes.js"
import { connectDB } from "./config/db.js";

dotenv.config();

const app =express();
app.use(express.json());
const PORT=process.env.PORT || 5000

app.use("/api/products",productRoutes);

app.listen(PORT,()=>{
    connectDB();
    console.log("Server connected at http://localhost:"+ PORT)
});