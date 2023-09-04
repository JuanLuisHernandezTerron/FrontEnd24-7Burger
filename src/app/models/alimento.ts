export interface alimento{
    _id?: String,
    nombre: String,
    descripcion?: String,
    alergenos?: Array<any>,
    tipoAlimento: String,
    precio: Number,
    imagen: String,
    extras?: String,
}