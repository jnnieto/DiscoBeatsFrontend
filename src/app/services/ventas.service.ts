import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { VentasAlbum } from '../models/ventas-album.model';
import { VentasCancion } from '../models/ventas-cancion.model';

const baseUrl = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  constructor(private http: HttpClient) { }

  ventasAlbum(idAlbum: number) {
    return this.http.get<VentasAlbum>(`${ baseUrl }/albumes/vista/${ idAlbum }`);
  }

  ventasCancion(idCancion: number) {
    return this.http.get<VentasCancion>(`${ baseUrl }/canciones/vista/${ idCancion }`);
  }

}
