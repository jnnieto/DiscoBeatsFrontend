export class Artista {
    constructor(
        public idGeneroMusical: number,
        public idOcupacion: number,
        public nombreArtistico: string,
        public fechaNacimiento: Date,
        public nacionalidad: string,
        public descripcion: string,
        public id?: number,
        public imagen?: File
    ) {}
}