import { Like } from './like.model';
import { Rol } from './rol.model';
import { Solicitud } from './solicitud.model';

export class User {
  rol: Rol;
  google: boolean;
  createdAt: string;
  updatedAt: string;
  myLikes: Like[];
  name: string;
  email: string;
  image: string;
  uid: string;
  password: string;
  solicitudes: Solicitud[];
  token: string;
  user: any;

  constructor(
    name?: string,
    email?: string,
    password?: string,
    rol?: Rol,
    google?: boolean,
    createdAt?: string,
    updatedAt?: string,
    myLikes?: Like[],
    solicitudes?: Solicitud[],
    image?: string,
    uid?: string,
    token?: string
  ) {
    this.rol = rol as Rol;
    this.google = google as boolean;
    this.createdAt = createdAt as string;
    this.updatedAt = updatedAt as string;
    this.name = name as string;
    this.email = email as string;
    this.image = image as string;
    this.uid = uid as string;
    this.password = password as string;
    this.myLikes = myLikes as Like[];
    this.solicitudes = solicitudes as Solicitud[];
    this.token = token as string;
  }
}
