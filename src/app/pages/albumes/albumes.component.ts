import { Component, OnInit } from '@angular/core';
import { AlbumService } from './../../services/album.service'
import { Album } from 'src/app/models/album.model';

@Component({
  selector: 'app-albumes',
  templateUrl: './albumes.component.html',
  styleUrls: ['./albumes.component.css']
})
export class AlbumesComponent implements OnInit {

  public albumes: Album[];
  constructor(private albumService: AlbumService) { }

  ngOnInit() {

    this.obtenerListaAlbumes();
  }

  obtenerListaAlbumes() {
    this.albumService.obtenerAlbumes().subscribe( data => {
      this.albumes = data;
    }, error => {
      console.log(error);
    })
  }

}
