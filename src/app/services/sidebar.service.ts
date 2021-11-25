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
        { titulo: 'Usuarios', url: 'usuarios', icono: 'fa fa-user-circle-o'},
        { titulo: 'Artistas', url: 'artistas', icono: 'mdi mdi-microphone-variant'},
        { titulo: 'Álbumes', url: 'albumes', icono: 'mdi mdi-disk-alert' },
        { titulo: 'Canciones', url: 'canciones', icono: 'fa fa-music' },
      ]
    }
  ]

  constructor() { }

}
