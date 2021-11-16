import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      titulo: 'Inicio',
      icono: 'mdi mdi-gauge', 
      submenu: [
        { titulo: 'Main', url: '/' },
        { titulo: 'Artistas', url: 'artistas' },
        { titulo: 'Albumes', url: 'albumes' },
        { titulo: 'Canciones', url: 'canciones' },
      ]
    }
  ]

  admin: any[] = [
    {
      titulo: 'Artistas',
      icono: 'mdi mdi-gauge', 
      submenu: [
        /* { titulo: 'Main', url: '/' } */
      ]
    }
  ]
  
  constructor() { }

}
