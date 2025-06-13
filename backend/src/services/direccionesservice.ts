import { db } from "../db";
import { DireccionEnvio } from "../models/direccionEnvio";

export async function obtenerDireccionesDeUsuario(
  usuarioId: number
): Promise<DireccionEnvio[]> {
  const [rows] = await db.query(
    'SELECT * FROM direcciones_envio WHERE usuario_id = ?',
    [usuarioId]
  );
  return rows as DireccionEnvio[];
}

export async function crearDireccion(direccion: DireccionEnvio): Promise<number> {
    const { usuario_id, direccion: dir, ciudad, region, pais, codigo_postal} = direccion;
    const [result] = await db.query( 'INSERT INTO direcciones_envio (usuarios_id, direccion, ciudad, region, pais, codigo_postal) VALUES (?,?,?,?,?,?',
        [usuario_id, dir, ciudad, region, pais, codigo_postal]
    );
    return (result as any).insertId
}

export async function eliminarDireccion(id: number): Promise<void> {
    await db.query('DELETE FROM direcciones_envio WHERE id = ?', [id]);
}