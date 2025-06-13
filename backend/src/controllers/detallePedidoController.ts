import { IncomingMessage, ServerResponse } from 'http';
import {
  agregarDetalle,
  eliminarDetalle,
  obtenerDetallesPedido
} from '../services/detallePedidoService';

export async function handleDetallePedido(req: IncomingMessage, res: ServerResponse) {
  const url = req.url || '';
  const pedidoMatch = url.match(/^\/api\/detalle-pedido\/pedido\/(\d+)$/);
  const idMatch = url.match(/^\/api\/detalle-pedido\/(\d+)$/);

  if (req.method === 'GET' && pedidoMatch) {
    const pedidoId = parseInt(pedidoMatch[1]);
    const detalles = await obtenerDetallesPedido(pedidoId);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(detalles));
    return;
  }

  if (req.method === 'POST' && url === '/api/detalle-pedido') {
    let body = '';
    req.on('data', chunk => (body += chunk));
    req.on('end', async () => {
      const data = JSON.parse(body);
      const id = await agregarDetalle(data);
      res.statusCode = 201;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ id }));
    });
    return;
  }

  if (req.method === 'DELETE' && idMatch) {
    const id = parseInt(idMatch[1]);
    await eliminarDetalle(id);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ success: true }));
    return;
  }

  res.statusCode = 404;
  res.end('Not Found');
}
