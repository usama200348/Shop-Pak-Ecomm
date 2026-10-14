const Product = require('../model/Product');
const cloudinary = require('../config/cloudinary');
const { getCategoryLabel, getCategoryOption } = require('../utils/categories');

// Getting ALL Product
const getProducts = async(req,res)=>{
    try{
        const { category, search, sort } = req.query;
        const query = {};

        if (category && String(category).toLowerCase() !== "all") {
            const option = getCategoryOption(category);
            const categoryLabel = option ? option.label : category;
            query.category = new RegExp(`^${categoryLabel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i');
        }

        if (search) {
            query.name = { $regex: String(search).trim(), $options: 'i' };
        }

        let productsQuery = Product.find(query);

        if (sort === 'low') {
            productsQuery = productsQuery.sort({ price: 1 });
        } else if (sort === 'high') {
            productsQuery = productsQuery.sort({ price: -1 });
        } else if (sort === 'newest') {
            productsQuery = productsQuery.sort({ createdAt: -1 });
        }

        const products = await productsQuery;
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

const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;
        const normalizedCategory = getCategoryLabel(category);
        
        let imgUrl = req.body.images || '';
        if (req.file) {
            const img = await cloudinary.uploader.upload(req.file.path);
            imgUrl = img.secure_url;
        }
        
        const product = new Product({
            name,
            description,
            price,
            category: normalizedCategory,
            stock,
            images: imgUrl
        });
        const savedProduct = await product.save();
        return res.status(201).json({ message: "Product Saved In Database Successfully", product: savedProduct });
    } catch (error) {
        console.log("Error While Creating Product:", error.message);
        return res.status(500).json({
            message: "Error While Creating Product: " + error.message,
        });
    }
};

// Update Product
const updateProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;
        const product_id = await Product.findById(req.params.id);
        if (product_id) {
            if (name !== undefined) product_id.name = name;
            if (description !== undefined) product_id.description = description;
            if (price !== undefined) product_id.price = price;
            if (category !== undefined) product_id.category = getCategoryLabel(category);
            if (stock !== undefined) product_id.stock = stock;
            if (req.file) {
                const update_imgs = await cloudinary.uploader.upload(req.file.path);
                product_id.images = update_imgs.secure_url;
            } else if (req.body.images) {
                product_id.images = req.body.images;
            }
            const updatedProduct = await product_id.save();
            return res.json(updatedProduct);
        } else {
            return res.status(404).json({ message: "Product Not Found" });
        }
    } catch (error) {
        console.log("Server Error While Updating Product:", error.message);
        return res.status(500).json({ message: "Internal Server Error While Updating Product: " + error.message });
    }
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
