import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Album } from './../models/album.model';
import { AuthService } from './auth.service';

const baseUrl = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  /**
  * Constructor sobrecargado de AlbumService
  * @param http
  */
  constructor(private http: HttpClient, private authService: AuthService) { }

  obtenerAlbumes() {
    return this.http.get<Album[]>(`${baseUrl}/albumes`);
  }

  obtenerAlbumPorId(id: number) {
    return this.http.get<Album>(`${baseUrl}/albumes/${id}`);
  }

  agregarNuevoAlbum(album: Album) {
    return this.http.post(`${baseUrl}/albumes`, album, {
      headers: {
        'token': this.authService.token
      }
    });
  }

  editarAlbum(album: Album) {
    return this.http.put<Album>(`${baseUrl}/albumes`, album, {
      headers: {
        'token': this.authService.token
      }
    });
  }

  eliminarAlbum(id: number) {
    return this.http.delete(`${baseUrl}/albumes/${id}`, {
      headers: {
        'token': this.authService.token
      }
    });
  }

}
