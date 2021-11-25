export class Album {

  public idGeneroMusical: number;
  public nombre: string;
  public descripcion: string;
  public fechaLanzamiento: string;
  public precio: number;
  public id?: number;
  public imagen?: File;

  constructor( album?: Album ) {}
}
