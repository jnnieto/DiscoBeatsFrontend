import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Cancion } from '../models/cancion.model';
import { AuthService } from './auth.service';

const baseUrl = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CancionService {

  /**
  * Constructor sobrecargado de CancionService
  * @param http
  */
  constructor(private http: HttpClient, private authService: AuthService) { }

  obtenerCanciones() {
    return this.http.get<Cancion[]>(`${baseUrl}/canciones`);
  }

  obtenerCancionPorId(id: number) {
    return this.http.get<Cancion>(`${baseUrl}/canciones/${id}`);
  }

  agregarNuevaCancion(cancion: Cancion) {
    return this.http.post(`${baseUrl}/canciones`, cancion, {
      headers: {
        'token': this.authService.token
      }
    });
  }

  editarCancion(cancion: Cancion) {
    return this.http.put<Cancion>(`${baseUrl}/canciones`, cancion, {
      headers: {
        'token': this.authService.token
      }
    });
  }

  eliminarCancion(id: number) {
    return this.http.delete(`${baseUrl}/canciones/${id}`, {
      headers: {
        'token': this.authService.token
      }
    });
  }

}
