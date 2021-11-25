import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      titulo: 'Menú',
      submenu: [
        { titulo: 'Inicio', url: '/',  icono: 'mdi mdi-home' },
        { titulo: 'Artistas', url: 'artistas', icono: 'mdi mdi-account-star-variant'},
        { titulo: 'Álbumes', url: 'albumes', icono: 'mdi mdi-disk-alert' },
        { titulo: 'Canciones', url: 'canciones', icono: 'mdi mdi-music-circle' },
      ]
    }
  ]

  constructor() { }

}
