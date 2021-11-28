import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Album } from 'src/app/models/album.model';
import { Artista } from 'src/app/models/artista.model';
import { Cancion } from 'src/app/models/cancion.model';
import { AlbumService } from 'src/app/services/album.service';
import { ArtistaService } from 'src/app/services/artista.service';
import { CancionService } from './../../../services/cancion.service';

@Component({
  selector: 'app-detalle-artistas',
  templateUrl: './detalle-artistas.component.html',
  styleUrls: []
})
export class DetalleArtistasComponent implements OnInit {

  public artista: Artista[];
  public nombreArtistico: string;
  public album: Album[];
  public cancion: Cancion[];

  constructor(
    private artistaService: ArtistaService,
    private albumService: AlbumService,
    private cancionService: CancionService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.obtenerArtistaPorId(data.id);
    })


    this.route.params.subscribe(data => {
      this.obtenerAlbumesArtista(data.id);
    })

    this.route.params.subscribe(data => {
      this.obtenerCancionesArtista(data.id);
    })
  }

  obtenerArtistaPorId(id: number) {
    this.artistaService.obtenerArtistaPorId(id).subscribe(data => {
      this.artista = data;
      this.nombreArtistico = data[0].nombreArtistico.replace(/ /g, "");
    }, error => {
      console.log(error);
    });
  }

  obtenerAlbumesArtista(id: number) {
    this.albumService.obtenerAlbumesPorArtista(id).subscribe(data => {
      this.album = data;
    }, error => {
      console.log(error);
    });
  }

  obtenerCancionesArtista(id: number) {
    this.cancionService.obtenerCancionesPorArtista(id).subscribe(data => {
      this.cancion = data;
    }, error => {
      console.log(error);
    });
  }
}
