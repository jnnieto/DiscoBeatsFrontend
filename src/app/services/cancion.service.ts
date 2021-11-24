import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Cancion } from '../models/cancion.model';

const baseUrl = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CancionService {

  /**
  * Constructor sobrecargado de CancionService
  * @param http
  */
  constructor(private http: HttpClient) { }

  obtenerCanciones() {
    return this.http.get<Cancion[]>(`${baseUrl}/canciones`);
  }

}
