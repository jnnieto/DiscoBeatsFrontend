import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumService } from 'src/app/services/album.service';
import { ArtistaService } from 'src/app/services/artista.service';
import { CancionService } from 'src/app/services/cancion.service';
import { Cancion } from 'src/app/models/cancion.model';
import { Artista } from 'src/app/models/artista.model';
import { Album } from 'src/app/models/album.model';

@Component({
  selector: 'app-detalle-canciones',
  templateUrl: './detalle-canciones.component.html',
  styleUrls: [ ]
})
export class DetalleCancionesComponent implements OnInit {

  public cancion: Cancion;
  public artista: Artista;
  public album: Album;

  constructor(
    private cancionService: CancionService,
    private artistaService: ArtistaService,
    private albumService: AlbumService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.obtenerCancionPorId(data.id);
    })
  }

  obtenerCancionPorId(id: number) {
    this.cancionService.obtenerCancionPorId(id).subscribe(data => {
      this.cancion = data[0];
      this.obtenerArtistaCancion(this.cancion.idArtista);
      this.obtenerAlbumCancion(this.cancion.idAlbum);
    }, error => {
      console.log(error);
    });
  }

  obtenerAlbumCancion(id: number) {
    this.albumService.obtenerAlbumPorId(id).subscribe(data => {
      this.album = data[0];
    }, error => {
      console.log(error);
    });
  }

  obtenerArtistaCancion(id: number) {
    this.artistaService.obtenerArtistaPorId(id).subscribe(data => {
      this.artista = data[0];
    }, error => {
      console.log(error);
    });
  }
}
