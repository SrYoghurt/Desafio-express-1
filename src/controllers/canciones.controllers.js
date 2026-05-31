import {
  getCanciones,
  addCancion,
  updateCancion,
  deleteCancion
} from '../services/canciones.service.js';

export const obtenerCanciones = async (req, res) => {
  const canciones = await getCanciones();
  res.json(canciones);
};

export const crearCancion = async (req, res) => {
  const nuevaCancion = await addCancion(req.body);
  res.status(201).json(nuevaCancion);
};

export const actualizarCancion = async (req, res) => {
  const { id } = req.params;
  const cancionActualizada = await updateCancion(id, req.body);

  if (!cancionActualizada) {
    return res.status(404).json({ message: 'Canción no encontrada' });
  }

  res.json(cancionActualizada);
};

export const borrarCancion = async (req, res) => {
  const { id } = req.params;
  const eliminada = await deleteCancion(id);

  if (!eliminada) {
    return res.status(404).json({ message: 'Canción no encontrada' });
  }

  res.json({ message: 'Canción eliminada correctamente' });
};