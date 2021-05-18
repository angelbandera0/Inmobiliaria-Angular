import { Casa } from './casa.model';

export class ListadoCasaResponse {
  total: number;
  casas: Casa[];
  constructor(total: number, casas: Casa[]) {
    this.total = total;
    this.casas = casas;
  }
}
