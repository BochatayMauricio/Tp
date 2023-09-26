import { Router } from "express";
import { getOneSell, getSales, newSell } from "../controllers/sales.controller";

const router = Router();

router.get('/',getSales);
router.get('/:dniCustomer',getOneSell);
router.post('/',newSell);

export default router;