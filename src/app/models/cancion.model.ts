export class Cancion {

  public id?: number;
  public idArtista?: number;
  public idAlbum?: number;
  public idGenero: number;
  public nombre: string;
  public duracion: string;
  public fechaLanzamiento: string;
  public reproducciones: number;
  public precio: number;
  public imagen?: File;

  constructor(cancion?: Cancion) { }

}
