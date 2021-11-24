import { Component, OnInit } from '@angular/core';
import { Cancion } from '../../models/cancion.model';
import { CancionService } from './../../services/cancion.service';

@Component({
  selector: 'app-canciones',
  templateUrl: './canciones.component.html',
  styleUrls: ['./canciones.component.css']
})
export class CancionesComponent implements OnInit {

  public canciones: Cancion[];

  constructor(private cancionService: CancionService) { }

  ngOnInit() {
    this.obtenerListaCanciones();
  }

  obtenerListaCanciones() {
    this.cancionService.obtenerCanciones().subscribe( data => {
      this.canciones = data;
      console.log(this.canciones)
    }, error => {
      console.log(error);
    })
  }
}
