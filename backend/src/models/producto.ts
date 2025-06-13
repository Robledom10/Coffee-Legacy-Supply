export interface Producto {
  id?: number;
  vendedor_id: number;
  nombre: string;
  descripcion?: string;
  categoria?: string;
  precio: number;
  imagen_url?: string;
  fecha_publicacion?: Date;
  categoria_id?: number;
}
