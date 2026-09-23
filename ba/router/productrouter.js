import {Router} from "express";
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from "../controllers/productController.js";

const productRouter = Router();

productRouter.post("/", createProduct);
productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProductById);      
productRouter.put("/:id", updateProduct);
productRouter.delete("/:id", deleteProduct);    

export default productRouter;
