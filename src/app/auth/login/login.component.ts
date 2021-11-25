import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { AuthService } from 'src/app/services/auth.service';
import { Login } from './../../interfaces/login.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CryptoService } from './../../services/crypto.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {

  public loginForm = this.fb.group({
    correo: ['', [
      Validators.required,
      Validators.email,
    ]],
    contrasena: ['', [
      Validators.required
    ]]
  })

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private cryptoService: CryptoService
    ) { }

  ngOnInit(): void {

    this.loginForm;

  }

  login() {

    let login: Login = {
      correo: this.loginForm.get('correo').value,
      contrasena: this.loginForm.get('contrasena').value
    } 

    this.authService.login(login).subscribe(() => {
      sessionStorage.setItem('email', login.correo);
      this.cryptoService.encryptUsingAES256(login.contrasena);
      Swal.fire('Bienvenido', this.decodeToken().usuario, 'success')
      this.router.navigate([''])
    }, error => {
      Swal.fire('Error', error.error.error, 'error')
    }); 
  }

  decodeToken() {
    let token = sessionStorage.getItem('token');
    const helper = new JwtHelperService();
    const decodeToken = helper.decodeToken(token);

    return decodeToken;

  }

}
