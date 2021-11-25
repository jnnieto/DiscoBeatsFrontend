import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './../guards/auth.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ArtistasComponent } from './artistas/artistas.component';
import { DetalleArtistasComponent } from './artistas/detalle-artistas/detalle-artistas.component';
import { AlbumesComponent } from './albumes/albumes.component';
import { CancionesComponent } from './canciones/canciones.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { DetalleAlbumesComponent } from './albumes/detalle-albumes/detalle-albumes.component';
import { DetalleCancionesComponent } from './canciones/detalle-canciones/detalle-canciones.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [
  {
      path: 'inicio',
      component: PagesComponent,
      canActivate: [ AuthGuard ],
      children: [
        { path: '', component: DashboardComponent, data: { titulo: 'Inicio' } },
        { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Usuarios' } },
        { path: 'artistas', component: ArtistasComponent, data: { titulo: 'Artistas' } },
        { path: 'detalle-artista/:id', component: DetalleArtistasComponent, data: { titulo: 'Detalle Artista' } },
        { path: 'albumes', component: AlbumesComponent, data: { titulo: 'Albumes' }  },
        { path: 'detalle-album/:id', component: DetalleAlbumesComponent, data: { titulo: 'Detalle Álbum' }  },
        { path: 'canciones', component: CancionesComponent, data: { titulo: 'Canciones' }  },
        { path: 'detalle-cancion/:id', component: DetalleCancionesComponent, data: { titulo: 'Detalle Canción' }  },
        { path: 'perfil-usuario/:id', component: PerfilUsuarioComponent, data: { titulo: 'Perfil de usuario' } },
      ]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
