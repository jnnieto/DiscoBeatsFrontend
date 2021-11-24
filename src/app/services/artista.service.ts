import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Artista } from './../models/artista.model';

const baseUrl = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ArtistaService {

  /**
  * Constructor sobrecargado de ArtistaService
  * @param http
  */
  constructor(private http: HttpClient) { }

  obtenerArtistas() {

    return this.http.get<Artista[]>(`${baseUrl}/artistas`);
  }
}
