import { AppRoutingModule } from './../app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { PagesComponent } from './pages.component';
import { ArtistasComponent } from './artistas/artistas.component';
import { AlbumesComponent } from './albumes/albumes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetalleArtistasComponent } from './artistas/detalle-artistas/detalle-artistas.component';
import { CancionesComponent } from './canciones/canciones.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { DetalleAlbumesComponent } from './albumes/detalle-albumes/detalle-albumes.component';
import { DetalleCancionesComponent } from './canciones/detalle-canciones/detalle-canciones.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { GenerosComponent } from './generos/generos.component';
import { ComprasCancionesComponent } from './compras-canciones/compras-canciones.component';
import { ComprasAlbumesComponent } from './compras-albumes/compras-albumes.component';

@NgModule({
  declarations: [
    PagesComponent,
    ArtistasComponent,
    AlbumesComponent,
    CancionesComponent,
    DetalleArtistasComponent,
    PerfilUsuarioComponent,
    DetalleAlbumesComponent,
    DetalleCancionesComponent,
    UsuariosComponent,
    GenerosComponent,
    ComprasCancionesComponent,
    ComprasAlbumesComponent
  ],
  exports: [
    PagesComponent,
    ArtistasComponent,
    AlbumesComponent,
    CancionesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
