import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      titulo: 'Menú', icono: 'mdi mdi-bookmark-music',
      submenu: [
        { titulo: 'Usuarios', url: 'usuarios', icono: 'fa fa-user-circle-o' },
        { titulo: 'Artistas', url: 'artistas', icono: 'mdi mdi-microphone-variant' },
        { titulo: 'Álbumes', url: 'albumes', icono: 'mdi mdi-disk-alert' },
        { titulo: 'Canciones', url: 'canciones', icono: 'fa fa-music' },
      ]
    }
  ]

  menuAdmin: any[] = [
    {
      titulo: 'Historial Compras', icono: 'mdi mdi-history',
      submenu: [
        { titulo: 'Álbumes', url: 'compras-albumes', icono: 'fa fa-file-audio-o' },
        { titulo: 'Canciones', url: 'compras-canciones', icono: 'fa fa-file-audio-o' },
      ]
    }
  ]

  constructor(private authService: AuthService) { }

  menuAdminSideBar() {
    let rol = this.authService.decodeToken.rol;

    if (rol === 'Administrador') {
      this.menu = this.menu.concat(this.menuAdmin);
    }
      return this.menu;
  }
}
