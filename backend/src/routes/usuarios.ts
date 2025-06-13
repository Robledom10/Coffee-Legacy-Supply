import { IncomingMessage, ServerResponse } from 'http';
import {
  getUsuarios,
  crearUsuario,
  getUsuarioById,
  eliminarUsuario,
  login
} from '../controllers/usuarioscontroller';

export function handleUsuarios(req: IncomingMessage, res: ServerResponse) {
  const url = req.url || '';
  const idMatch = url.match(/^\/api\/usuarios\/(\d+)$/);

  if (req.method === 'GET' && url === '/api/usuarios') {
    return getUsuarios(res);
  }

  if (req.method === 'POST' && url === '/api/usuarios') {
    return crearUsuario(req, res);
  }

  if (req.method === 'POST' && url === '/api/login') {
    return login(req, res);
  }

  if (req.method === 'GET' && idMatch) {
    const id = parseInt(idMatch[1]);
    return getUsuarioById(id, res);
  }

  if (req.method === 'DELETE' && idMatch) {
    const id = parseInt(idMatch[1]);
    return eliminarUsuario(id, res);
  }

  res.statusCode = 404;
  res.end('Not found');
}
