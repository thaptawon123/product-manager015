import Product from "../model/productModel";


const createProduct = async (req, res, next) => {
    try {
        const { name, price, description, image } = req.body; 
        if (!name || !price) {
            return res.status(400).json(message: "Name and price are required fields.");
        }
        const newProduct = await Product.create({ name, price, description, image 
        });
        return res.status(201).json(newProduct);
    }catch (error) {
        return next(error);
    }
};
const getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        return res.status(200).json(products);
    } catch (error) {
        return next(error);
    }
};
const getProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json(product);
    } catch (error) {
        return next(error);
    }
};
const updateProduct = async (req, res, next) => {
    try {
        const { name, price, description, image } = req.body;
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { name, price, description, image },
            { new: true }
        );
        return res.status(200).json(updatedProduct);
    } catch (error) {
        return next(error);
    }
};
const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        await Product.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        return next(error);
    }
};

export { 
    createProduct, 
    getAllProducts, 
    getProduct, 
    updateProduct, 
    deleteProduct 
};