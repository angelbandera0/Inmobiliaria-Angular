import { Component, OnInit } from '@angular/core';
import { Roles } from 'src/app/enums/roles.enum';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-header-dash',
  templateUrl: './header-dash.component.html',
  styleUrls: ['./header-dash.component.css']
})
export class HeaderDashComponent implements OnInit {
  isAdmin = false;
  isLogin = false;
  name!: string | null;
  constructor(private tokenStorage: TokenStorageService) {}

  ngOnInit(): void {
    this.isAdmin = this.tokenStorage.getAuthorities() === Roles.ADMIN_ROLE;
    this.isLogin = this.tokenStorage.getUsername() != null;
    this.name = this.tokenStorage.getUsername();
  }
  logout():void{
    this.tokenStorage.singout();
    window.location.reload;
  }
}
