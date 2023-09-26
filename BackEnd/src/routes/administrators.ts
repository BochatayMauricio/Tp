import { Router } from "express";
import { getAdministrators } from "../controllers/administrators.controller";
import { getOneAdministrator } from "../controllers/administrators.controller";
import { updateAdministrator } from "../controllers/administrators.controller";
import { deleteAdministrator } from "../controllers/administrators.controller";
import { newAdministrator } from "../controllers/administrators.controller";

const router = Router();

router.get('/',getAdministrators);
router.delete('/:dni',deleteAdministrator);
router.put('/:dni',updateAdministrator);
router.post('/',newAdministrator);
router.get('/:dni',getOneAdministrator);


export default router;