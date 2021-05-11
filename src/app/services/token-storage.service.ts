import { Injectable } from "@angular/core";
const TOKEN_KEY = "AuthToken";
const USERNAME_KEY = "AuthUsername";
const AUTHORITIES_KEY = "AuthAuthorities";
const DATAUSER_KEY = "AuthDataUser";

@Injectable({
  providedIn: "root",
})
export class TokenStorageService {
  constructor() {}

  singout() {
    window.sessionStorage.clear();
  }
  public saveToken(token: string ) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  public getToken(): string | null{
    return window.sessionStorage.getItem(TOKEN_KEY);
  }
  public saveUsername(username: string) {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, username);
  }
  public getUsername(): string | null {
    return window.sessionStorage.getItem(USERNAME_KEY);
  }
  public saveAuthorities(role: string) {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, role);
  }
  public getAuthorities(): string | null{
    return window.sessionStorage.getItem(AUTHORITIES_KEY);
  }
  public isLoggedIn(): boolean {
    return !this.getToken() ? false : true;
  }
}
