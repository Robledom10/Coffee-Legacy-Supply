import { handleProductos } from '../controllers/productosController';
import { IncomingMessage, ServerResponse } from 'http';

export function productosRouter(req: IncomingMessage, res: ServerResponse) {
  handleProductos(req, res);
}
