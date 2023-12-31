"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customers_controller_1 = require("../controllers/customers.controller");
const router = (0, express_1.Router)();
router.get('/', customers_controller_1.getCustomers);
router.delete('/:dni', customers_controller_1.deleteCustomer);
router.put('/:dni', customers_controller_1.updateCustomer);
router.post('/', customers_controller_1.newCustomer);
router.get('/:dni', customers_controller_1.getOneCustomer);
exports.default = router;
