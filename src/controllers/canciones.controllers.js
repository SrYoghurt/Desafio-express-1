import {
  getCanciones,
  addCancion,
  updateCancion,
  deleteCancion
} from '../services/canciones.service.js';
// importamos las funciones del servicio de canciones, me aventure a probar despues de la clase

export const obtenerCanciones = async (req, res) => {
  const canciones = await getCanciones();
  res.json(canciones);
};// obtenemos las canciones del servicio y las devolvemos como respuesta en formato JSON

export const crearCancion = async (req, res) => {
  const nuevaCancion = await addCancion(req.body);
  res.status(201).json(nuevaCancion);
};// creamos una nueva canción utilizando los datos enviados en el cuerpo de la solicitud, luego devolvemos la canción creada con un status 201 (creado) en formato JSON

export const actualizarCancion = async (req, res) => {
  const { id } = req.params;
  const cancionActualizada = await updateCancion(id, req.body);

  if (!cancionActualizada) {
    return res.status(404).json({ message: 'Canción no encontrada' });
  }

  res.json(cancionActualizada);
};// actualizamos una canción existente utilizando su id y los nuevos datos enviados en el cuerpo de la solicitud, si la canción no se encuentra devolvemos un status 404 (no encontrado) con un mensaje, sino devolvemos la canción actualizada en formato JSON

export const borrarCancion = async (req, res) => {
  const { id } = req.params;
  const eliminada = await deleteCancion(id);

  if (!eliminada) {
    return res.status(404).json({ message: 'Canción no encontrada' });
  }

  res.json({ message: 'Canción eliminada correctamente' });
};// eliminamos una canción existente utilizando su id, si la canción no se encuentra devolvemos un status 404 (no encontrado) con un mensaje, sino devolvemos un mensaje de confirmación en formato JSON