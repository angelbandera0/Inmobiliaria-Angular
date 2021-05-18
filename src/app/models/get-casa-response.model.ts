import { Casa } from "./casa.model";

export class GetCasaResponse {
  casa:Casa;
  constructor(casa:Casa){
    this.casa=casa;
  }
}
