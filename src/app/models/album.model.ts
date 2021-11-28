export class Album {

  public id?: number;
  public idArtista: number;
  public idGeneroMusical: number;
  public nombre: string;
  public descripcion: string;
  public fechaLanzamiento: string;
  public imagen?: File;
  public precio: number;
  public nombreArtistico?: string;
  public nombreGeneroMusical?: string;

  constructor( album?: Album ) {}
}
