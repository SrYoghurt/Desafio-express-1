import { Router } from 'express';
import {
    obtenerCanciones,
    crearCancion,
    actualizarCancion,
    borrarCancion
} from '../controllers/canciones.controllers.js';// importamos las funciones del controlador de canciones


export const router = Router();// creamos un router de express para manejar las rutas relacionadas con las canciones, segun lo visto en clase

router.get('/canciones', obtenerCanciones);
router.post('/canciones', crearCancion);
router.put('/canciones/:id', actualizarCancion);
router.delete('/canciones/:id', borrarCancion);