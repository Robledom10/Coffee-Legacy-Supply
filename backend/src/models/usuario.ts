export interface Usuario {
  id?: number;
  nombre: string;
  email: string;
  contraseña_hash?: string;
  tipo_usuario: 'comprador' | 'vendedor' | 'admin';
}
