export class Rol {
  users: Array<string>;
  createdAt: string;
  updatedAt: string;
  id: string;
  rol: string;
  __v: number;

constructor(
  rol: string,
  users: Array<string>,
  createdAt: string,
  updatedAt: string,
  id: string,
  __v: number
) {
  this.rol = rol;
  this.users = users;
  this.createdAt = createdAt;
  this.updatedAt = updatedAt;
  this.__v = __v;
  this.id = id;
}
}
