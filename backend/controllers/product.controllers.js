
import Product from "../models/product.model.js"

export const getProduct=async (req,res)=>{
    try{
        const products=await Product.find({});
        res.status(202).json({success:true,data:products});

    }catch(error){
        res.status(404).json({success:false,message:'Products could not be fetched'});
        console.error('error',error.message);
    }
};



export const createProduct = async (req, res) => {
    const product = req.body; // User input

    // Validation check for required fields
    if (!product.name || !product.price || !product.image) {
        return res.status(403).json({ success: false, message: 'Please enter valid details' });
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(202).json({ success: true, data: newProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
        console.error('error:', error.message);
    }
};



export const updateProduct=async(req,res)=>{
    const {id}=req.params;

    const product=req.body;

    try{
       const updatedProduct=await Product.findByIdAndUpdate(id,product,{new:true})
        res.status(200).json({success:true,data:updatedProduct});
    }catch(error){
        res.status(404).json({success:false,message:'could not update product'});
        console.error('error:',error.message);
    }




};

export const deleteProduct=async(req,res)=>{
    const {id}=req.params

    try{
        await Product.findByIdAndDelete(id);
        res.status(202).json({success:true,message:'Product Deleted'});


    }catch(error){
        res.status(500).json({success:false,message:'Please enter the correct product ID'});
        console.error('error:',error.message);
    }

};
