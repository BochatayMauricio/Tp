"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const router = (0, express_1.Router)();
router.post('/login', user_1.loginUser);
router.get('/login/:email', user_1.getCustomer);
exports.default = router;
