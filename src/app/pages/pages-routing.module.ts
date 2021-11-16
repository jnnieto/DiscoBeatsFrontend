import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ArtistasComponent } from './artistas/artistas.component';
import { AlbumesComponent } from './albumes/albumes.component';

const routes: Routes = [
  {
      path: 'inicio',
      component: PagesComponent,
      children: [
        { path: '', component: DashboardComponent, data: { titulo: 'Inicio' } },
        { path: 'artistas', component: ArtistasComponent, data: { titulo: 'Artistas' }  },
        { path: 'albumes', component: AlbumesComponent, data: { titulo: 'Albumes' }  },
        { path: 'canciones', component: AlbumesComponent, data: { titulo: 'Canciones' }  },
      ]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
