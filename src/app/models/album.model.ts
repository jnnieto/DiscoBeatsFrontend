export class Album {

  public id?: number;
  public idArtista: number;
  public idGeneroMusical: number;
  public nombre: string;
  public descripcion: string;
  public fechaLanzamiento: string;
  public precio: number;
  public imagen?: File;

  constructor( album?: Album ) {}
}
