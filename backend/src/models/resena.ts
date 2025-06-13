export interface Resena {
  id?: number;
  producto_id: number;
  comprador_id: number;
  calificacion: number; // 1 a 5
  comentario?: string;
  fecha?: string;
}
