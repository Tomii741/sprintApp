import { Router } from "express";
import {
    homeTareas,
    dameTareas,
    tareasId,
    agregarTareas,
    // editarTarea,
    editar,
    eliminarTarea
}  from "../controllers/tareasControler.js"

export const router = Router();
