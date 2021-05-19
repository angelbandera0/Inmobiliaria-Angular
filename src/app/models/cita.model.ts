import { Casa } from './casa.model';
import { User } from './user.model';

export class Cita {
  _id: string;
  fecha: string;
  user: User;
  casa: Casa;
  detallesCita: string;
  estado: string;
  leida: boolean;
  createdAt: string;
  constructor(
    _id?: string,
    fecha?: string,
    user?: User,
    casa?: Casa,
    detallesCita?: string,
    estado?: string,
    leida?: boolean,
    createdAt?: string
  ) {
    this.fecha = fecha as string;
    this._id = _id as string;
    this.user = user as User;
    this.casa = casa as Casa;
    this.detallesCita = detallesCita as string;
    this.estado = estado as string;
    this.leida = leida as boolean;
    this.createdAt = createdAt as string;
  }
}
