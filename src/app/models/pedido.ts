export interface pedido{
    id_pedido?: String,
    datos_pedido: Array<[]>,
    recogida_envio?: String,
    estado_pedido?: String,
    id_tienda: String,
    datos_cliente: {
        nombre: string;
        telefono: number;
        direccion?: string;
        dni: string;
      };
    _id:number;
}