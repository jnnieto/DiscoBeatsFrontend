export class CompraAlbum {
  public id: number;
  public idAlbum: number;
  public idUsuario: number;
  public precioTotal: number;
  public fechaCompra?: string;
  public album?: string;
  public nombreUsuario?: string;

  constructor(compraAlbum?: CompraAlbum) {}

}
