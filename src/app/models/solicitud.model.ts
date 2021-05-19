import { Like } from './like.model';
import { User } from './user.model';

export class Solicitud {
  _id: string;
  title: string;
  nombre: string;
  apellidos: string;
  user: User;
  likes: Like[];
  img: string[];
  createdAt: string;
  updatedAt: string;
  description: string;
  cantLikes: number;
  provincia: string;
  municipio: string;
  localidad: string;
  tipoPropiedad: string;
  precio: number;
  numTelefonoPropietario: string;
  cantBannos: number;
  cantCuartos: number;
  tienePatio: boolean;
  tieneGaraje: boolean;
  tieneCarpoch: boolean;
  like?: Like;
  estado?: string;

  constructor(
    _id?: string,
    title?: string,
    nombre?: string,
    apellidos?: string,
    user?: User,
    likes?: Like[],
    img?: string[],
    createdAt?: string,
    updatedAt?: string,
    description?: string,
    cantLikes?: number,
    provincia?: string,
    municipio?: string,
    localidad?: string,
    tipoPropiedad?: string,
    precio?: number,
    numTelefonoPropietario?: string,
    cantBannos?: number,
    cantCuartos?: number,
    tienePatio?: boolean,
    tieneGaraje?: boolean,
    tieneCarpoch?: boolean,
    estado?: string
  ) {
    this._id = _id as string;
    this.title = title as string;
    this.nombre = nombre as string;
    this.apellidos = apellidos as string;
    this.user = user as User;
    this.likes = likes as Like[];
    this.img = img as string[];
    this.createdAt = createdAt as string;
    this.updatedAt = updatedAt as string;
    this.description = description as string;
    this.cantLikes = cantLikes as number;
    this.provincia = provincia as string;
    this.municipio = municipio as string;
    this.localidad = localidad as string;
    this.tipoPropiedad = tipoPropiedad as string;
    this.precio = precio as number;
    this.numTelefonoPropietario = numTelefonoPropietario as string;
    this.cantBannos = cantBannos as number;
    this.cantCuartos = cantCuartos as number;
    this.tienePatio = tienePatio as boolean;
    this.tieneGaraje = tieneGaraje as boolean;
    this.tieneCarpoch = tieneCarpoch as boolean;
    this.estado = estado;
  }
}
