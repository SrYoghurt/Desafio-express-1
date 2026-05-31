import { readFile, writeFile } from 'node:fs/promises';

const path = './src/api/repertorio.json';

export const getCanciones = async () => {
    const data = await readFile(path, 'utf-8');
    if (!data.trim()) return [];
    return JSON.parse(data);
};

export const saveCanciones = async (canciones) => {
    await writeFile(path, JSON.stringify(canciones, null, 2));
};

export const addCancion = async (cancion) => {
    const canciones = await getCanciones();
    canciones.push(cancion);
    await saveCanciones(canciones);
    return cancion;
};

export const updateCancion = async (id, cancionesActualizadas) => {
    const canciones = await getCanciones();
    const index = canciones.findIndex((c) => String(c.id) === String(id));

    if (index === -1) return null;

    canciones[index] = { ...canciones[index], ...cancionesActualizadas };
    await saveCanciones(canciones);
    return canciones[index];
};

export const deleteCancion = async (id) => {
    const canciones = await getCanciones();
    const nuevasCanciones = canciones.filter((c) => String(c.id) !== String(id));

    if (nuevasCanciones.length === canciones.length) return false;

    await saveCanciones(nuevasCanciones);
    return true;
};