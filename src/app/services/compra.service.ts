import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

import { AuthService } from './auth.service';

import { CompraAlbum } from '../models/compra-album.model';
import { CompraCancion } from '../models/compra-cancion.model';

const baseUrl = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  constructor(
    private http: HttpClient,
    private authService: AuthService) { }

  // Compra albumes

  obtenerComprasAlbumes() {
    return this.http.get<CompraAlbum[]>(`${ baseUrl }/comprasA`);
  }

  obtenerComprasAUsuario(idUsuario: string) {
    return this.http.get<CompraAlbum[]>(`${ baseUrl }/comprasA/usuarios/${ idUsuario }`);
  }

  realizarCompraAlbum(compraAlbum: CompraAlbum) {
    return this.http.post(`${ baseUrl }/comprasA/`, compraAlbum, {
      headers: {
        'token': this.authService.token
      }
    });
  }

  // Compra canciones

  obtenerComprasCanciones() {
    return this.http.get<CompraCancion[]>(`${ baseUrl }/comprasC`);
  }

  obtenerComprasCUsuario(idUsuario: string) {
    return this.http.get<CompraCancion[]>(`${ baseUrl }/comprasC/usuarios/${ idUsuario }`);
  }

  realizarCompraCancion(compraCancion: CompraCancion) {
    return this.http.post(`${ baseUrl }/comprasC/`, compraCancion, {
      headers: {
        'token': this.authService.token
      }
    });
  }

}
