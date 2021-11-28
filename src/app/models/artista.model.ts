export class Artista {

  public id?: number;
  public idGeneroMusical: number;
  public idOcupacion: number;
  public nombreOcupacion?: string;
  public nombreArtistico: string;
  public fechaNacimiento: string;
  public nacionalidad: string;
  public descripcion: string;
  public imagen?: File;

  constructor(artista?: Artista) { }
}
