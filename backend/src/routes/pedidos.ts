import { IncomingMessage, ServerResponse } from 'http';
import { handlePedidos } from '../controllers/pedidosController';

export function pedidosRouter(req: IncomingMessage, res: ServerResponse) {
  handlePedidos(req, res);
}
