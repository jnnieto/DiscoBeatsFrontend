import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { GeneroMusical } from './../models/genero-musical.model';
import { AuthService } from './auth.service';

const baseUrl = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class GeneroMusicalesService {

  constructor(
    private http: HttpClient,
    private authService: AuthService) { }

  obtenerGenerosMusicales() {
    return this.http.get<GeneroMusical[]>(`${baseUrl}/generos`);
  }

  obtenerGeneroMusicalPorId(id: number) {
    return this.http.get<GeneroMusical>(`${baseUrl}/generos/${id}`);
  }

  agregarNuevogeneroMusical(genero: GeneroMusical) {
    return this.http.post(`${baseUrl}/generos`, genero, {
      headers: {
        'token': this.authService.token
      }
    });
  }

  editarGeneroMusical(genero: GeneroMusical) {
    return this.http.put<GeneroMusical>(`${baseUrl}/generos`, genero, {
      headers: {
        'token': this.authService.token
      }
    });
  }

  eliminarGeneroMusical(id: number) {
    return this.http.delete(`${baseUrl}/generos/${id}`, {
      headers: {
        'token': this.authService.token
      }
    });
  }
}
