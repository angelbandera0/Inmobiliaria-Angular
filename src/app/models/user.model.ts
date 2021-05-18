import { Like } from './like.model';
import { Rol } from './rol.model';

export class User {
  rol: Rol;
  google: boolean;
  createdAt: string;
  updatedAt: string;
  myLikes: Like[];
  name: string;
  email: string;
  img: string;
  uid: string;
  password: string;

  constructor(
    name?: string,
    email?: string,
    password?: string,
    rol?: Rol,
    google?: boolean,
    createdAt?: string,
    updatedAt?: string,
    myLikes?: Like[],
    img?: string,
    uid?: string
  ) {
    this.rol = rol as Rol;
    this.google = google as boolean;
    this.createdAt = createdAt as string;
    this.updatedAt = updatedAt as string;
    this.name = name as string;
    this.email = email as string;
    this.img = img as string;
    this.uid = uid as string;
    this.password = password as string;
    this.myLikes = myLikes as Like[];
  }
}
