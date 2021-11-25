import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Album } from 'src/app/models/album.model';
import { AlbumService } from 'src/app/services/album.service';

@Component({
  selector: 'app-detalle-albumes',
  templateUrl: './detalle-albumes.component.html',
  styleUrls: [ ]
})
export class DetalleAlbumesComponent implements OnInit {

  public album: Album;

  constructor(
    private albumService: AlbumService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.obtenerAlbumPorId(data.id);
    })

  }

  obtenerAlbumPorId(id: number) {
    this.albumService.obtenerAlbumPorId(id).subscribe(data => {
      this.album = data;
    }, error => {
      console.log(error);
    });
  }

}
