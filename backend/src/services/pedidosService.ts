import { db } from '../db';
import { Pedido } from '../models/pedido';
import { obtenerDetallesPedido } from './detallePedidoService';


export async function obtenerPedidos(): Promise<Pedido[]> {
  const [rows] = await db.query('SELECT * FROM pedidos');
  return rows as Pedido[];
}

export async function obtenerPedidoPorId(id: number): Promise<any> {
  const [rows] = await db.query('SELECT * FROM pedidos WHERE id = ?', [id]);
  const pedido = (rows as any[])[0];
  if (!pedido) return null;

  // Traer detalles del pedido
  const detalles = await obtenerDetallesPedido(id);
  pedido.detalles = detalles;

  return pedido;
}


export async function crearPedido(pedido: Pedido): Promise<number> {
  const { comprador_id, estado = 'pendiente', total = 0 } = pedido;
  const [result] = await db.query(
    'INSERT INTO pedidos (comprador_id, estado, total) VALUES (?, ?, ?)',
    [comprador_id, estado, total]
  );
  return (result as any).insertId;
}

export async function eliminarPedido(id: number): Promise<void> {
  await db.query('DELETE FROM pedidos WHERE id = ?', [id]);
}
