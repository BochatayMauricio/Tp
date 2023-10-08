import { Router } from "express";
import { deleteCustomer, getCustomers, updateCustomer } from "../controllers/customers";
import { loginUser } from "../controllers/user";
import validateToken from "./validate-token";


const router = Router();

router.get('/', validateToken, getCustomers);
router.delete('/:dni', deleteCustomer);
router.put('/:dni', updateCustomer)
router.post('/login', loginUser);



export default router;