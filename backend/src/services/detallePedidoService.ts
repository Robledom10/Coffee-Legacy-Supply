import { promises } from "stream";
import { db } from "../db";
import { DetallePedido } from "../models/detallePedido";

export async function obtenerDetallesPedido(
  pedidoId: number
): Promise<any[]> {
  const [rows] = await db.query(
    `
    SELECT 
      dp.producto_id,
      p.nombre,
      p.descripcion,
      p.imagen_url,
      dp.cantidad,
      dp.precio_unitario
    FROM detalle_pedido dp
    JOIN productos p ON dp.producto_id = p.id
    WHERE dp.pedido_id = ?
  `,
    [pedidoId]
  );

  return rows as any[];
}
export async function agregarDetalle(p: DetallePedido): Promise<number> {
  const [result] = await db.query(
    "INSERT INTO detalle_pedido (pedido-id, producto-id, cantidad, pecio_unitario, subtotal) VALUES (?, ?, ?, ?, ?)",
    [p.pedido_id, p.producto_id, p.cantidad, p.precio_unitario, p.subtotal]
  );
  return (result as any).insertId;
}

export async function eliminarDetalle(id: number): Promise<void> {
  await db.query("DELETE FROM detalle_pedido WHERE id= ?", [id]);
}
