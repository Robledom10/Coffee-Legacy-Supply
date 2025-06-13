import { IncomingMessage, ServerResponse } from "http";
import { handleUsuarios } from "./usuarios";
import { productosRouter } from "./productos";
import { pedidosRouter } from "./pedidos";
import { detallePedidoRouter } from "./detallePedido";
import { resenasRouter } from "./resenas";
import { direccionesRouter } from './direccionesEnvio';

export function router(req: IncomingMessage, res: ServerResponse) {
  const url = req.url || "";
  if (url.startsWith("/api/usuarios")) return handleUsuarios(req, res);
  if (url.startsWith("/api/productos")) return productosRouter(req, res);
  if (url.startsWith("/api/pedidos")) return pedidosRouter(req, res);
  if (url.startsWith("/api/detalle-pedido")) return detallePedidoRouter(req, res);
  if (url.startsWith("/api/resenas")) return resenasRouter(req, res);
  if (url.startsWith('/api/direcciones')) return direccionesRouter(req, res);
  res.statusCode = 404;
  res.end("Not Found");
}
