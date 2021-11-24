import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Artista } from 'src/app/models/artista.model';
import { ArtistaService } from 'src/app/services/artista.service';

@Component({
  selector: 'app-detalle-artistas',
  templateUrl: './detalle-artistas.component.html',
  styleUrls: []
})
export class DetalleArtistasComponent implements OnInit {

  public artista: Artista;
  public nombreArtistico: string;

  constructor(
    private artistaService: ArtistaService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.obtenerArtista(data.id);
    })

  }

  obtenerArtista(id: number) {
    this.artistaService.obtenerArtistaPorId(id).subscribe(data => {
      this.artista = data;
      this.nombreArtistico = data.nombreArtistico.replace(/ /g, "");
    }, error => {
      console.log(error);
    }
    );

  }
}
