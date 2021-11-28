import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Artista } from './../models/artista.model';
import { AuthService } from './auth.service';
import { Ocupacion } from './../models/ocupacion.model';

const baseUrl = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ArtistaService {

  /**
  * Constructor sobrecargado de ArtistaService
  * @param http
  */
  constructor(
    private http: HttpClient,
    private authService: AuthService) { }

  obtenerArtistas() {
    return this.http.get<Artista[]>(`${baseUrl}/artistas`);
  }

  obtenerArtistaPorId(id: number) {
    return this.http.get<Artista[]>(`${baseUrl}/artistas/${ id.toString() }`);
  }

  agregarNuevoArtista(artista: Artista) {
    return this.http.post(`${baseUrl}/artistas`, artista, {
      headers: {
        'token': this.authService.token
      }
    });
  }

  editarArtista(artista: Artista) {
    return this.http.put<Artista>(`${baseUrl}/artistas`, artista, {
      headers: {
        'token': this.authService.token
      }
    });
  }

  eliminarArtista(id: number){
    return this.http.delete(`${baseUrl}/artistas/${id}`, {
      headers: {
        'token': this.authService.token
      }
    });
  }

  obtenerOcupaciones() {
    return this.http.get<Ocupacion[]>(`${baseUrl}/artistas/ocupaciones`);
  }

}
