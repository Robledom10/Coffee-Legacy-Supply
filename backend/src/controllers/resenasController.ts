import { IncomingMessage, ServerResponse } from "http";
import {
  obtenerResenasPorProducto,
  crearResena,
  eliminarResena,
} from "../services/resenaService";
import { obtenerPromedioPorProducto } from "../services/resenaService";

export async function handleResenas(req: IncomingMessage, res: ServerResponse) {
  const url = req.url || "";
  const productoMatch = url.match(/^\/api\/resenas\/producto\/(\d+)$/);
  const idMatch = url.match(/^\/api\/resenas\/(\d+)$/);
  const promedioMatch = url.match(/^\/api\/resenas\/promedio\/(\d+)$/);
  if (req.method === "GET" && promedioMatch) {
    const productoId = parseInt(promedioMatch[1]);
    const promedio = await obtenerPromedioPorProducto(productoId);
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        producto_id: productoId,
        promedio: promedio.promedio,
        total_resenas: promedio.total,
      })
    );
    return;
  }

  if (req.method === "GET" && productoMatch) {
    const productoId = parseInt(productoMatch[1]);
    const resenas = await obtenerResenasPorProducto(productoId);
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(resenas));
    return;
  }

  if (req.method === "POST" && url === "/api/resenas") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", async () => {
      const data = JSON.parse(body);
      const resenaId = await crearResena(data);
      res.statusCode = 201;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ id: resenaId }));
    });
    return;
  }

  if (req.method === "DELETE" && idMatch) {
    const id = parseInt(idMatch[1]);
    await eliminarResena(id);
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ success: true }));
    return;
  }

  res.statusCode = 404;
  res.end("Not Found");
}
