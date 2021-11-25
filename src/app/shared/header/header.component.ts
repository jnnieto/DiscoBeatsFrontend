import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Login } from './../../interfaces/login.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Usuario } from './../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public usuario: Usuario;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.infoUsuario();
  }

  infoUsuario() {
    this.authService.obtenerInfoUsuario().subscribe(data => {
      this.usuario = data;
    })
  }

  cerrarSesion (){

    let correo = this.decodeToken().correo;

    this.authService.cerrarSesion(correo).subscribe(() => {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('email');
      sessionStorage.removeItem('pass');
      this.router.navigate(['inicio-sesion'])
    }, error => console.log(error))
  }

  decodeToken() {
    
    let token = sessionStorage.getItem('token');
    const helper = new JwtHelperService();
    const decodeToken = helper.decodeToken(token);

    return decodeToken;

  }

}
