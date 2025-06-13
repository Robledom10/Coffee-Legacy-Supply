import { db } from '../db';
import { Producto } from '../models/producto';
import { obtenerPromedioPorProducto } from './resenaService';


export async function obtenerProductos(): Promise<Producto[]> {
  const [rows] = await db.query('SELECT * FROM productos');
  const productos = rows as any[];

  for (const producto of productos) {
    const { promedio, total } = await obtenerPromedioPorProducto(producto.id);
    producto.promedio_calificacion = promedio;
    producto.total_resenas = total;
  }

  return productos;
}

export async function obtenerProductoPorId(id: number): Promise<Producto | null> {
  const [rows] = await db.query('SELECT * FROM productos WHERE id = ?', [id]);
  return (rows as Producto[])[0] || null;
}

export async function crearProducto(producto: Producto): Promise<number> {
  const { vendedor_id, nombre, descripcion, categoria, precio, imagen_url, categoria_id } = producto;
  const [result] = await db.query(
    'INSERT INTO productos (vendedor_id, nombre, descripcion, categoria, precio, imagen_url, categoria_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [vendedor_id, nombre, descripcion, categoria, precio, imagen_url, categoria_id]
  );
  return (result as any).insertId;
}

export async function eliminarProducto(id: number): Promise<void> {
  await db.query('DELETE FROM productos WHERE id = ?', [id]);
}
