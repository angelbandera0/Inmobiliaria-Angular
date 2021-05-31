import { Casa } from './casa.model';

export class Venta {
  _id:string;
  casa: Casa;
  precioVenta: number;
  comision: number;
  createdAt: string;
  updatedAt: string;
  constructor(
    _id?:string,
    casa?: Casa,
    precioVenta?: number,
    comision?: number,
    createdAt?: string,
    updatedAt?: string
  ) {
    this._id=_id as string;
    this.casa = casa as Casa;
    this.precioVenta = precioVenta as number;
    this.comision = comision as number;
    this.createdAt = createdAt as string;
    this.updatedAt = updatedAt as string;
  }
}
