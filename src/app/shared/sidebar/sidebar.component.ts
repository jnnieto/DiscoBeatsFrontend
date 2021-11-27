import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SidebarService } from './../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  menuItems: any[];

  usuario: any;

  constructor(
    private router: Router,
    private sidebarService: SidebarService,
    private authService: AuthService
    ) {
    this.menuItems = sidebarService.menuAdminSideBar();
  }

  ngOnInit(): void {

    this.usuario = this.authService.decodeToken;

  }

  cerrarSesion() {
    this.authService.cerrarSesion(this.authService.decodeToken.correo).subscribe(() => {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('email');
      sessionStorage.removeItem('pass');
      this.router.navigate(['inicio-sesion'])
    }, error => console.log(error))
  }

}
