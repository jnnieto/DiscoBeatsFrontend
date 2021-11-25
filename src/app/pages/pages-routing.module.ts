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

const routes: Routes = [
  {
      path: 'inicio',
      component: PagesComponent,
      canActivate: [ AuthGuard ],
      children: [
        { path: '', component: DashboardComponent, data: { titulo: 'Inicio' } },
        { path: 'artistas', component: ArtistasComponent, data: { titulo: 'Artistas' } },
        { path: 'detalle-artista/:id', component: DetalleArtistasComponent, data: { titulo: 'Detalle Artista' } },
        { path: 'albumes', component: AlbumesComponent, data: { titulo: 'Albumes' }  },
        { path: 'canciones', component: CancionesComponent, data: { titulo: 'Canciones' }  },
        { path: 'perfil-usuario/:id', component: PerfilUsuarioComponent, data: { titulo: 'Perfil de usuario' } },
      ]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class PagesRoutingModule { }
