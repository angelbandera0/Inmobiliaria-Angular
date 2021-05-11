import { User } from './user.model';
export class LoginResponse {
  token!: string;
  user!: User;
}
