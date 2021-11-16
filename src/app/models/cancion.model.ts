export class Cancion {
    constructor(
        public nombre: string,
        public duracion: Date,
        public reproducciones: number,
        public fechaLanzamiento: Date,
        public precio: number,
        public imagen?: File,
        public id?: number,
        public idArtista?: number,
        public idGenero?: number,
    ) {}
}