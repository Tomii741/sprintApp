import { Router } from "express";
import {
    home,
    agregarCreador,
    //dameCreadores
    // dameTareas,
    // tareasId,
    // agregarTareas,
    // editarTarea,
    // editar,
    // eliminarTarea
}  from "../controllers/tareasControler.js"

export const router = Router();

router.get('/', home);
router.post('/addCreadores', agregarCreador);
//router.get('/creador', dameCreadores);
// router.get("/tareas", dameTareas);
// router.get("/tareas/:id", tareasId);
// router.post("/addTareas", agregarTareas);
// router.get("/editar", editar);
// router.put("/editar/:id", editarTarea);
// router.delete("/eliminar/:id", eliminarTarea);