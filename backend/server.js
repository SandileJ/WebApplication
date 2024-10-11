import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from "./config/db.js";

dotenv.config();

const app=express();

app.use(express.json());

app.post('/api/products/',async (req,res)=>{
    const product = req.body // this is what the user will input

    if(!product.name|| !product.price|| !product.image){
        return res.status(400).json({success:false, message:'Please enter valid details'});

    }

    const newProduct = new Product(product);

    try{
        await newProduct.save();
        res.status(202).json({succcess:true,data:newProduct});
        console.log('Product Successfully added');
        
    }catch(error){
        res.status(500).json({success:true,message:'server error!'});

    }
});

app.delete('/api/products/:id',async (req,res)=>{
    const {id} = req.params;

    try{
        await product.findByIdAndDelete(id);
        res.status(202).json({success:true,message:'Product deleted'});


    }catch(error){
        res.status(500).json({success:false,message:'server error'});
        console.error('error:',error.message);
    }

    

});


app.get('/api/products',async (req,res)=>{
    try{
        const products= await Product.find({});
        res.status(200).json({success:true,data:products});
        console.log('Products are available');
    
    }catch(error){
        res.status(404).json({success:false,message:'No products found'});
        console.error('Error fetching products:',error.message);

    }
})

app.put('/api/products/:id',async(req,res)=>{

    const {id}= req.params;

    const product=req.body;

    try{
        const updatedProduct=await Product.findByIdAndUpdate(id,product,{new:true});
        res.status(202).json({success:true,data:updatedProduct});

    }catch(error){
        res.status(500).json({success:true,message:'faile to update product'});
        console.error('error:',error.message);
    }
})
  
app.listen(5000,()=>{
    connectDB();
    console.log("Server started at http://localhost:5000");
})