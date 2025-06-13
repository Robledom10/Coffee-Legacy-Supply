import { db } from "../db";
import { hashPassword } from "../utils/hash";

export async function crearUsuario(data: {
  nombre: string;
  email: string;
  contraseña: string;
  tipo_usuario: string;
}): Promise<{ id: number }> {
  const hash = await hashPassword(data.contraseña);

  const [result] = await db.query(
    'INSERT INTO usuarios (nombre, email, contraseña_hash, tipo_usuario) VALUES (?, ?, ?, ?)',
    [data.nombre, data.email, hash, data.tipo_usuario]
  );

  return { id: (result as any).insertId }; // Si quieres tipar mejor, usa ResultSetHeader como vimos antes
}
