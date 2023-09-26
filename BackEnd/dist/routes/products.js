"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_controller_1 = require("../controllers/products.controller");
const products_controller_2 = require("../controllers/products.controller");
const products_controller_3 = require("../controllers/products.controller");
const products_controller_4 = require("../controllers/products.controller");
const products_controller_5 = require("../controllers/products.controller");
const multer_1 = __importDefault(require("multer"));
const router = (0, express_1.Router)();
const storage = require('../db/multer');
const uploader = (0, multer_1.default)({ storage });
router.get('/', products_controller_1.getProducts);
router.post('/', uploader.single('file'), products_controller_2.newProduct);
router.delete('/:id', products_controller_3.deleteProduct);
router.put('/:id', products_controller_4.updateProduct);
router.get('/:id', products_controller_5.getOneProduct);
exports.default = router;