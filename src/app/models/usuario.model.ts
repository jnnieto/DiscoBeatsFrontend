export class Usuario {
    constructor(
        public nombreUsuario: string,
        public correo: string,
        public contrasena: string,
        public id?: number
    ) {}
}