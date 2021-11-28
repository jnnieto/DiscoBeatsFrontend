import { Component, OnInit } from '@angular/core';
import { CompraAlbum } from 'src/app/models/compra-album.model';

import { CompraService } from '../../services/compra.service';

@Component({
  selector: 'app-compras-albumes',
  templateUrl: './compras-albumes.component.html',
  styleUrls: [ ]
})
export class ComprasAlbumesComponent implements OnInit {

  public historialCompras: CompraAlbum[];


  constructor(
    private comprasAlbum: CompraService,
  ) { }

  ngOnInit(): void {
    this.listarHistorialCompras();
  }

  listarHistorialCompras() {
    this.comprasAlbum.obtenerComprasAlbumes().subscribe( data => {
      this.historialCompras = data;
    });
  }

}
