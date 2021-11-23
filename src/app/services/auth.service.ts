import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

import { tap } from 'rxjs/operators';

import { Registro } from '../interfaces/registro.interface';
import { Login } from './../interfaces/login.interface';
import { log } from 'console';

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

  registrarUsuario(formData: Registro) {
    console.log(formData);
    
    return this.http.post(`${ baseUrl }/usuarios`, formData);
  }

  login(formData: Login) {
    return this.http.post(`${ baseUrl }/auth/login`, formData)
                    .pipe(
                      tap(({ token }: any) => {
                        localStorage.setItem('token', token);
                      })
                    );
  }


}
