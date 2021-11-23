import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { Rol } from './../models/roles.model';


const baseUrl = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }

  obtenerRoles() {
    return this.http.get<Rol[]>(`${ baseUrl }/usuarios/roles`);
  }
}
