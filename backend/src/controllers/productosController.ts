import { IncomingMessage, ServerResponse } from 'http';
import { crearProducto, eliminarProducto, obtenerProductoPorId, obtenerProductos } from '../services/productService';

export async function handleProductos(req: IncomingMessage, res: ServerResponse) {
  const url = req.url || '';
  const idMatch = url.match(/^\/api\/productos\/(\d+)$/);

  if (req.method === 'GET' && url === '/api/productos') {
    const productos = await obtenerProductos();
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(productos));
    return;
  }

  if (req.method === 'GET' && idMatch) {
    const id = parseInt(idMatch[1]);
    const producto = await obtenerProductoPorId(id);
    if (producto) {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(producto));
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: 'Producto no encontrado' }));
    }
    return;
  }

  if (req.method === 'POST' && url === '/api/productos') {
    let body = '';
    req.on('data', chunk => (body += chunk));
    req.on('end', async () => {
      const data = JSON.parse(body);
      const productoId = await crearProducto(data);
      res.statusCode = 201;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ id: productoId }));
    });
    return;
  }

  if (req.method === 'DELETE' && idMatch) {
    const id = parseInt(idMatch[1]);
    await eliminarProducto(id);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ success: true }));
    return;
  }

  res.statusCode = 404;
  res.end('Not Found');
}
