import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

import { tap } from 'rxjs/operators';

import { Registro } from '../interfaces/registro.interface';
import { Login } from './../interfaces/login.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Usuario } from '../models/usuario.model';

const baseUrl = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /**
   * Constructor sobrecargado de AuthService
   * @param http
   */
  constructor(private http: HttpClient) { }

  get token(): string {
    return sessionStorage.getItem('token') || '';
  }

  get decodeToken(): any {
    const helper = new JwtHelperService();
    const decodeToken = helper.decodeToken(this.token);
    return decodeToken;
  }

  registrarUsuario(formData: Registro) {
    return this.http.post(`${ baseUrl }/usuarios`, formData);
  }

  login(formData: Login) {
    return this.http.post(`${ baseUrl }/auth/login`, formData)
                    .pipe(
                      tap(({ token }: any) => {
                        sessionStorage.setItem('token', token);
                      })
                    );
  }

  obtenerInfoUsuario() {
    return this.http.get<Usuario>(`${ baseUrl }/usuarios/${ this.decodeToken.sub }` )
  }

  cerrarSesion(correo: any) {

    return this.http.put<any>(`${ baseUrl }/auth/logout`, { correo }, {
      headers: {
        'token': this.token
      }
    });

  }

}
