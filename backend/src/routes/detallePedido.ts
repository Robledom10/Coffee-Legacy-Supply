import { IncomingMessage, ServerResponse } from "http";
import { handleDetallePedido } from "../controllers/detallePedidoController";

export function detallePedidoRouter(req: IncomingMessage, res: ServerResponse) {
    handleDetallePedido(req, res);
 }