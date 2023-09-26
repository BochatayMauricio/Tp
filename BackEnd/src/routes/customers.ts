import { Router } from "express";
import { deleteCustomer, getCustomers, getOneCustomer, newCustomer, updateCustomer } from "../controllers/customers.controller";


const router = Router();

router.get('/',getCustomers);
router.delete('/:dni',deleteCustomer);
router.put('/:dni',updateCustomer);
router.post('/',newCustomer);
router.get('/:dni',getOneCustomer);


export default router;