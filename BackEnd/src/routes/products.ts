import { Router } from "express";
import { getProducts } from "../controllers/products.controller";
import { newProduct } from "../controllers/products.controller";
import { deleteProduct } from "../controllers/products.controller";
import { updateProduct } from "../controllers/products.controller";
import { getOneProduct } from "../controllers/products.controller";
import multer from "multer";
const router = Router();
const storage = require('../db/multer')
const uploader = multer({storage})

router.get('/',getProducts);
router.post('/',uploader.single('file'),newProduct);
router.delete('/:id',deleteProduct);
router.put('/:id',updateProduct);
router.get('/:id',getOneProduct);

export default router;