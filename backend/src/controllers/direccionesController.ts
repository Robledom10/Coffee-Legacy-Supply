import { IncomingMessage, ServerResponse } from 'http';
import {
  obtenerDireccionesDeUsuario,
  crearDireccion,
  eliminarDireccion
} from '../services/direccionesservice';

export async function handleDirecciones(req: IncomingMessage, res: ServerResponse) {
  const url = req.url || '';
  const userMatch = url.match(/^\/api\/direcciones\/usuario\/(\d+)$/);
  const idMatch = url.match(/^\/api\/direcciones\/(\d+)$/);

  if (req.method === 'GET' && userMatch) {
    const usuarioId = parseInt(userMatch[1]);
    const direcciones = await obtenerDireccionesDeUsuario(usuarioId);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(direcciones));
    return;
  }

  if (req.method === 'POST' && url === '/api/direcciones') {
    let body = '';
    req.on('data', chunk => (body += chunk));
    req.on('end', async () => {
      const data = JSON.parse(body);
      const id = await crearDireccion(data);
      res.statusCode = 201;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ id }));
    });
    return;
  }

  if (req.method === 'DELETE' && idMatch) {
    const id = parseInt(idMatch[1]);
    await eliminarDireccion(id);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ success: true }));
    return;
  }

  res.statusCode = 404;
  res.end('Not Found');
}
