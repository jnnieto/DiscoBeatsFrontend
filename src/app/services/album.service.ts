import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Album } from './../models/album.model';

const baseUrl = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  /**
  * Constructor sobrecargado de AlbumService
  * @param http
  */
   constructor(private http: HttpClient) { }

   obtenerAlbumes() {
     return this.http.get<Album[]>(`${baseUrl}/albumes`);
   }

}
