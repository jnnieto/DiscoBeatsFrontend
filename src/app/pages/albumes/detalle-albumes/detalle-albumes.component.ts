import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Album } from 'src/app/models/album.model';
import { AlbumService } from 'src/app/services/album.service';
import { Artista } from 'src/app/models/artista.model';
import { ArtistaService } from 'src/app/services/artista.service';
import { GeneroMusicalesService } from 'src/app/services/genero-musicales.service';
import { GeneroMusical } from 'src/app/models/genero-musical.model';
import { CancionService } from './../../../services/cancion.service';
import { Cancion } from 'src/app/models/cancion.model';
import { VentasService } from './../../../services/ventas.service';

@Component({
  selector: 'app-detalle-albumes',
  templateUrl: './detalle-albumes.component.html',
  styleUrls: [ ]
})
export class DetalleAlbumesComponent implements OnInit {

  public album: Album;
  public artista: Artista;
  public genero: GeneroMusical;
  public cancion: Cancion[];
  public ventas: number;

  constructor(
    private albumService: AlbumService,
    private artistaService: ArtistaService,
    private generoService: GeneroMusicalesService,
    private cancionService: CancionService,
    private ventasService: VentasService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.obtenerAlbumPorId(data.id);
      this.obtenerCancionesDelAlbum(data.id);
      this.obtenerVentas(data.id);
    })

  }

  obtenerAlbumPorId(id: number) {
    this.albumService.obtenerAlbumPorId(id).subscribe(data => {
      this.album = data[0];
      this.obtenerGeneroDelAlbum(this.album.idGeneroMusical);
      this.obtenerArtistaDelAlbum(this.album.idArtista);
    }, error => {
      console.log(error);
    });
  }

  obtenerVentas(id: number) {
    this.ventasService.ventasAlbum(id).subscribe(data => {
      this.ventas = data.ventas;
    });
  }

  obtenerArtistaDelAlbum(id: number) {
    this.artistaService.obtenerArtistaPorId(id).subscribe( data => {
      this.artista = data[0];
    }, error => {
      console.log(error);
    });
  }

  obtenerGeneroDelAlbum(id: number) {
    this.generoService.obtenerGeneroMusicalPorId(id).subscribe( data => {
      this.genero = data;
    }, error => {
      console.log(error);
    });
  }

  obtenerCancionesDelAlbum(id: number) {
    this.cancionService.obtenerCancionesDeAlbum(id).subscribe(data => {
      this.cancion = data;
    }, error => {
      console.log(error);
    });
  }

}
