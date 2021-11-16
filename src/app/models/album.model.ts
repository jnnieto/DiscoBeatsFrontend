export class Album {
    constructor(
        public idGeneroMusical: number,
        public nombre: string,
        public descripcion: string,
        public fechaLanzamiento: Date,
        public precio: number,
        public id?: number,
        public imagen?: File
    ) {}
}