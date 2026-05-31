import { readFile, writeFile } from 'node:fs/promises';

const path = './src/api/repertorio.json';

export const getCanciones = async () => {
    const data = await readFile(path, 'utf-8');
    if (!data.trim()) return [];
    return JSON.parse(data);
};// obtenemos las canciones del archivo JSON, si el archivo esta vacio devolvemos un array vacio, sino parseamos el contenido y lo devolvemos

export const saveCanciones = async (canciones) => {
    await writeFile(path, JSON.stringify(canciones, null, 2));
};// guardamos las canciones en el archivo JSON, stringify convierte el array de canciones a un string JSON, el null y 2 son para darle formato al JSON

export const addCancion = async (cancion) => {
    const canciones = await getCanciones();
    canciones.push(cancion);
    await saveCanciones(canciones);
    return cancion;
};// agregamos una nueva canción al archivo JSON

export const updateCancion = async (id, cancionesActualizadas) => {
    const canciones = await getCanciones();
    const index = canciones.findIndex((c) => String(c.id) === String(id));

    if (index === -1) return null;

    canciones[index] = { ...canciones[index], ...cancionesActualizadas };
    await saveCanciones(canciones);
    return canciones[index];
};// actualizamos una canción existente en el archivo JSON, buscamos la canción por su id, si no la encontramos devolvemos null, sino actualizamos la canción con los nuevos datos y la guardamos en el archivo JSON

export const deleteCancion = async (id) => {
    const canciones = await getCanciones();
    const nuevasCanciones = canciones.filter((c) => String(c.id) !== String(id));

    if (nuevasCanciones.length === canciones.length) return false;

    await saveCanciones(nuevasCanciones);
    return true;
};// eliminamos una canción del archivo JSON, filtramos las canciones para quedarnos solo con las que no tienen el id que queremos eliminar, si el array resultante tiene la misma longitud que el original significa que no se encontró la canción, entonces devolvemos false, sino guardamos el nuevo array de canciones en el archivo JSON y devolvemos true para indicar que la eliminación fue exitosa