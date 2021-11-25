import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { GeneroMusical } from './../models/genero-musical.model';

const baseUrl = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class GeneroMusicalesService {

  constructor(private http: HttpClient) { }

  obtenerGenerosMusicales() {
    return this.http.get<GeneroMusical[]>(`${baseUrl}/generos`);
  }

  obtenerGeneroMusicalPorId(id: number) {
    return this.http.get<GeneroMusical>(`${baseUrl}/generos/${id}`);
  }

}
