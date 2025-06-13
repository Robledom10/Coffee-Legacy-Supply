import { IncomingMessage, ServerResponse } from 'http';
import {
  crearPedido,
  eliminarPedido,
  obtenerPedidoPorId,
  obtenerPedidos
} from '../services/pedidosService';

export async function handlePedidos(req: IncomingMessage, res: ServerResponse) {
  const url = req.url || '';
  const idMatch = url.match(/^\/api\/pedidos\/(\d+)$/);

  if (req.method === 'GET' && url === '/api/pedidos') {
    const pedidos = await obtenerPedidos();
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(pedidos));
    return;
  }

  if (req.method === 'GET' && idMatch) {
    const id = parseInt(idMatch[1]);
    const pedido = await obtenerPedidoPorId(id);
    if (pedido) {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(pedido));
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: 'Pedido no encontrado' }));
    }
    return;
  }

  if (req.method === 'POST' && url === '/api/pedidos') {
    let body = '';
    req.on('data', chunk => (body += chunk));
    req.on('end', async () => {
      const data = JSON.parse(body);
      const pedidoId = await crearPedido(data);
      res.statusCode = 201;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ id: pedidoId }));
    });
    return;
  }

  if (req.method === 'DELETE' && idMatch) {
    const id = parseInt(idMatch[1]);
    await eliminarPedido(id);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ success: true }));
    return;
  }

  res.statusCode = 404;
  res.end('Not Found');
}
