export class Cancion {

  public id?: number;
  public idArtista?: number;
  public idAlbum?: number;
  public idGeneroMusical: number;
  public nombreArtistico?: string;
  public nombreAlbum?: string;
  public nombre: string;
  public duracion: string;
  public fechaLanzamiento: string;
  public reproducciones: number;
  public precio: number;
  public imagen?: File;
  public fueComprado?: boolean;

  constructor(cancion?: Cancion) {
  }

}
