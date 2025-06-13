import { IncomingMessage, ServerResponse } from 'http';
import { handleDirecciones } from '../controllers/direccionesController';

export function direccionesRouter(req: IncomingMessage, res: ServerResponse) {
  handleDirecciones(req, res);
}
