export type EstadoPedido = 'pendiente' | 'pagado' | 'enviado' | 'entregado' | 'cancelado';

export interface Pedido {
  id?: number;
  comprador_id: number;
  fecha?: string; // timestamp
  estado?: EstadoPedido;
  total?: number;
}
