export interface DireccionEnvio {
    id?: number;
    usuario_id: number;
    direccion: string;
    ciudad?: string;
    region?: string;
    pais?: string;
    codigo_postal?: string;
}