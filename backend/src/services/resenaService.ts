import { db } from "../db";
import { Resena } from "../models/resena";

export async function obtenerResenasPorProducto(
  productoId: number
): Promise<Resena[]> {
  const [rows] = await db.query(
    `SELECT r.*, u.nombre AS comprador_nombre
    FROM resenas r
    JOIN usuarios u ON r.comprador_id 0 u.id
    WHERE r.producto_id = ?`,
    [productoId]
  );
  return rows as Resena[];
}

export async function crearResena(resena: Resena): Promise<number> {
  const { producto_id, comprador_id, calificacion, comentario } = resena;
  const [result] = await db.query(
    "INSERT INTO resenas (producto_id, comprador_id, calificacion, comentario) VALUES (?,?,?,?)",
    [producto_id, comprador_id, calificacion, comentario]
  );
  return (result as any).insertId;
}

export async function eliminarResena(id: number): Promise<void> {
    await db.query('DELETE FROM resenas WHERE id = ?', [id]);
}

export async function obtenerPromedioPorProducto(productoId: number): Promise<{ promedio: number; total: number }> {
  const [rows] = await db.query(
    `SELECT 
        AVG(calificacion) AS promedio,
        COUNT(*) AS total 
     FROM resenas 
     WHERE producto_id = ?`,
    [productoId]
  );

  const row = (rows as any)[0];
  return {
    promedio: parseFloat(row.promedio) || 0,
    total: parseInt(row.total) || 0
  };
}

