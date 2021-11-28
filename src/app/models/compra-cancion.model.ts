export class CompraCancion {
  public id: number;
  public idCancion: number;
  public idUsuario: number;
  public precioTotal: number;
  public cancion?: string;
  public nombreUsuario?: string;

  constructor(compraAlbum?: CompraCancion) {}
}
