import { IncomingMessage, ServerResponse } from 'http';
import { handleResenas } from '../controllers/resenasController';

export function resenasRouter(req: IncomingMessage, res: ServerResponse) {
  handleResenas(req, res);
}
