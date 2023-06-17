import { Router } from "express";
import {methods as personaController} from "./../controllers/persona.controller";

const router=Router();

router.get("/personas",personaController.getAll);
router.get("/personas/:id",personaController.getById);
router.post("/personas",personaController.set);
router.put("/personas/:id",personaController.update);
router.delete("/personas/:id",personaController.del);

export default router;