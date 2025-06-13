import { IncomingMessage, ServerResponse } from "http";
import { db } from "../db";
import { hashPassword, verifyPassword } from "../utils/hash";
import { RowDataPacket, ResultSetHeader } from "mysql2/promise";

// Helper para parsear el body de la request
async function parseBody(req: IncomingMessage): Promise<any> {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", chunk => (body += chunk));
    req.on("end", () => {
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(err);
      }
    });
    req.on("error", reject);
  });
}

interface Usuario extends RowDataPacket {
  id: number;
  nombre: string;
  email: string;
  tipo_usuario: string;
  contraseña_hash?: string;
}

export async function getUsuarios(res: ServerResponse) {
  try {
    const [rows] = await db.query<Usuario[]>(
      "SELECT id, nombre, email, tipo_usuario FROM usuarios"
    );
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(rows));
  } catch (err: any) {
    res.statusCode = 500;
    res.end(JSON.stringify({ error: err.message }));
  }
}

export async function getUsuarioById(id: number, res: ServerResponse) {
  try {
    const [rows] = await db.query<Usuario[]>(
      "SELECT id, nombre, email, tipo_usuario FROM usuarios WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "Usuario no encontrado" }));
    } else {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(rows[0]));
    }
  } catch (err: any) {
    res.statusCode = 500;
    res.end(JSON.stringify({ error: err.message }));
  }
}

export async function crearUsuario(req: IncomingMessage, res: ServerResponse) {
  try {
    const { nombre, email, contraseña, tipo_usuario } = await parseBody(req);
    const hash = await hashPassword(contraseña);

    const [result] = await db.query<ResultSetHeader>(
      "INSERT INTO usuarios (nombre, email, contraseña_hash, tipo_usuario) VALUES (?, ?, ?, ?)",
      [nombre, email, hash, tipo_usuario]
    );

    res.statusCode = 201;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ id: result.insertId }));
  } catch (err: any) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: err.message }));
  }
}

export async function login(req: IncomingMessage, res: ServerResponse) {
  try {
    const { email, contraseña } = await parseBody(req);
    const [rows] = await db.query<Usuario[]>(
      "SELECT * FROM usuarios WHERE email = ?",
      [email]
    );

    const usuario = rows[0];

    if (!usuario || !(await verifyPassword(contraseña, usuario.contraseña_hash!))) {
      res.statusCode = 401;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "Credenciales inválidas" }));
    } else {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          id: usuario.id,
          nombre: usuario.nombre,
          tipo_usuario: usuario.tipo_usuario
        })
      );
    }
  } catch (err: any) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: err.message }));
  }
}

export async function eliminarUsuario(id: number, res: ServerResponse) {
  try {
    const [result] = await db.query<ResultSetHeader>(
      "DELETE FROM usuarios WHERE id = ?",
      [id]
    );

    res.setHeader("Content-Type", "application/json");

    if (result.affectedRows === 0) {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: "Usuario no encontrado" }));
    } else {
      res.statusCode = 200;
      res.end(JSON.stringify({ success: true }));
    }
  } catch (err: any) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: err.message }));
  }
}