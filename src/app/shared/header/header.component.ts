import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Login } from './../../interfaces/login.interface';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  cerrarSesion (){

    let correo = this.decodeToken().correo;

    this.authService.cerrarSesion(correo).subscribe(() => {
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
