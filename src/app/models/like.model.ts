import { Casa } from "./casa.model";
import { User } from "./user.model";

export class Like {
  user:User;
  casa:Casa;
  createdAt:string;
  updatedAt:string;

  constructor(user?:User,
    casa?:Casa,
    createdAt?:string,
    updatedAt?:string){
      this.user=user as User;
      this.casa=casa as Casa;
      this.createdAt=createdAt as string;
      this.updatedAt=updatedAt as string;
  }
}
