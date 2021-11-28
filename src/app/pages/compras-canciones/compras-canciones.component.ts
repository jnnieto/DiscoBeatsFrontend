import { Component, OnInit } from '@angular/core';
import { CompraCancion } from 'src/app/models/compra-cancion.model';
import { CompraService } from 'src/app/services/compra.service';

@Component({
  selector: 'app-compras-canciones',
  templateUrl: './compras-canciones.component.html',
  styleUrls: [ ]
})
export class ComprasCancionesComponent implements OnInit {

  public historialCompras: CompraCancion[];


  constructor(
    private comprasCancion: CompraService,
  ) { }

  ngOnInit(): void {
    this.listarHistorialCompras();
  }

  listarHistorialCompras() {
    this.comprasCancion.obtenerComprasCanciones().subscribe( data => {
      this.historialCompras = data;
    });
  }

}
