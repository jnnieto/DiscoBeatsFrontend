import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, tap } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { Rol } from './../models/roles.model';
import { Usuario } from './../models/usuario.model';
import { AuthService } from './auth.service';


const baseUrl = environment.base_url + '/usuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
    ) { }

  obtenerRoles() {
    return this.http.get<Rol[]>(`${ baseUrl }/roles`);
  }

  obtenerUsuarios() {
    return this.http.get<Usuario[]>(`${baseUrl }`);
  }

  obtenerUsuario(id: string) {
    return this.http.get<Usuario>(`${ baseUrl }/${ id }`);
  }

  agregarNuevoUsuario(usuario: Usuario) {
    return this.http.post(`${ baseUrl }`, usuario);
  }

  actualizarUsuario(usuario: Usuario) {
    return this.http.put(`${ baseUrl }`, usuario, {
      headers: {
        'token': this.authService.token
      }
    });
  }

  eliminarUsuario(id: number) {
    return this.http.delete(`${ baseUrl }/${ id }`, {
      headers: {
        'token': this.authService.token
      }
    });
  }

}
