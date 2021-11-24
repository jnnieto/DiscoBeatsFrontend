import { Component, OnInit } from '@angular/core';
import { ArtistaService } from './../../services/artista.service'
import { Artista } from 'src/app/models/artista.model';

@Component({
  selector: 'app-artistas',
  templateUrl: './artistas.component.html',
  styleUrls: ['./artistas.component.css']
})
export class ArtistasComponent implements OnInit {

  public artistas: Artista[];

  constructor(private artistaService: ArtistaService) { }

  ngOnInit() {

    this.obtenerListaArtistas();

  }

  obtenerListaArtistas() {
    this.artistaService.obtenerArtistas().subscribe( data => {
      this.artistas = data;
    }, error => {
      console.log(error);
    })
  }

}
