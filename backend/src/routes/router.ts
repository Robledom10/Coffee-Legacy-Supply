import { handleUsuarios } from './usuarios';
import { productosRouter } from './productos';
import { IncomingMessage, ServerResponse } from 'http';
import { pedidosRouter } from './pedidos';

export function router(req: IncomingMessage, res: ServerResponse) {
  const url = req.url || '';
  if (url.startsWith('/api/usuarios')) return handleUsuarios(req, res);
  if (url.startsWith('/api/productos')) return productosRouter(req, res);
  if (url.startsWith('/api/pedidos')) return pedidosRouter(req, res);

  res.statusCode = 404;
  res.end('Not Found');
}

