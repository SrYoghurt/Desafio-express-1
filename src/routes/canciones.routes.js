import { Router } from 'express';
import {
    obtenerCanciones,
    crearCancion,
    actualizarCancion,
    borrarCancion
} from '../controllers/canciones.controllers.js';


export const router = Router();

router.get('/canciones', obtenerCanciones);
router.post('/canciones', crearCancion);
router.put('/canciones/:id', actualizarCancion);
router.delete('/canciones/:id', borrarCancion);