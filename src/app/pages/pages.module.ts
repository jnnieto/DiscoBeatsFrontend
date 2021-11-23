import { AppRoutingModule } from './../app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { PagesComponent } from './pages.component';
import { ArtistasComponent } from './artistas/artistas.component';
import { AlbumesComponent } from './albumes/albumes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CancionesComponent } from './dashboard/canciones/canciones.component';

@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    ArtistasComponent,
    AlbumesComponent,
    CancionesComponent
  ],
  exports: [
    DashboardComponent,
    PagesComponent,
    ArtistasComponent,
    AlbumesComponent,
    CancionesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule,
    SharedModule
  ]
})
export class PagesModule { }