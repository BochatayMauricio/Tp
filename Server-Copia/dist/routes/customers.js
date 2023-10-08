"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customers_1 = require("../controllers/customers");
const user_1 = require("../controllers/user");
const validate_token_1 = __importDefault(require("./validate-token"));
const router = (0, express_1.Router)();
router.post('/', customers_1.newUser);
router.get('/', validate_token_1.default, customers_1.getCustomers);
router.delete('/:dni', customers_1.deleteCustomer);
router.put('/:dni', customers_1.updateCustomer);
router.post('/login', user_1.loginUser);
exports.default = router;
