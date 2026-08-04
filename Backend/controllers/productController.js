const Product = require('../model/Product');
const cloudinary = require('../config/cloudinary');

// Getting ALL Product
const getProducts = async(req,res)=>{
    try{
        const products = await Product.find();
        res.json(products);
    }catch(error){
        res.status(500).json({message:"Server Error While Getting All Products"});
        console.log("Internal Server Error While Getting All Products " , error.message);
        
    }
};

// Getting Product By ID
const getProductsbyId = async(req,res)=>{
    try{
        const product_id = await Product.findById(req.params.id);
        {product_id?res.json(product_id):res.status(404).json({message:"Product Not Found"})};
    }
    catch(error){
        res.status(500).json({message:"Server Error While Getting Products By Id"});
        console.log("Internal Server Error While Getting Product By Id", error.message);
        
    }
}

// Crating Product

const createProduct = async(req,res)=>{
    console.log("Reached Controller Console From ProductController.js Line 32");
    
    try{
    const {name,description,price,category,stock,} = req.body;
    
    let imgUrl = '';
        if (req.file) {
            const img = await cloudinary.uploader.upload(req.file.path);
            console.log("Image Link",img);
            imgUrl = img.secure_url;
        }
        // console.log("file",req.file);
        
        const product = new Product({
            name,
            description,
            price,
            category,
            stock,
            images:imgUrl
        });
        const savedProduct = await product.save();
        res.status(201).json({message: "Product Saved In Database Successfully"});
        console.log(savedProduct);
        
    }
    catch(error){
        res.status(500).json({message:"Internal Server Error While Creating Product"});
        console.log("Server Error While Creating Product",error.message);
        
    }
};


// Update Product


const updateProduct = async(req,res)=>{
    try{
        const {name,description,price,category,stock,} = req.body;
        const product_id=await Product.findById(req.params.id);
        if(product_id){
            product_id.name = name || product_id.name;
            product_id.description = description || product_id.description;
            product_id.price = price || product_id.price;
            product_id.category = category || product_id.category;
            product_id.stock = stock || product_id.stock;
            if (req.file) {
      const update_imgs = await cloudinary.uploader.upload(req.file.path);
      console.log(update_imgs);
      product_id.images   =  update_imgs.secure_url;
            } 
            const updatedProduct =await product_id.save();
            res.json(updatedProduct);
        }
        else{
            res.status(404).json({message:"Product Not Found"});
        };
    }catch(error){
        res.status(500).json({message : "Internal Server Error While Updating Product"});
        console.log("Server Error While Updating Product" , error.message);
    };
};



// Delete Product From Database

const deleteProduct = async(req,res)=>{
    try{
    const remove_product = await Product.findById(req.params.id);
    if (remove_product) {
        await remove_product.deleteOne();
        res.json({message:"Product Removed Successfully"});
    }else{
        res.status(404).json({message:"Product Not Found"});
    }}
    catch(error){
        res.status(500).json({message:"Internal Server Error While Deleting Product From Database"});
        console.log("Server Error While Deleting Database", error.message);
    }
}

module.exports={
    getProducts,
    getProductsbyId,
    createProduct ,
    updateProduct,
    deleteProduct
}