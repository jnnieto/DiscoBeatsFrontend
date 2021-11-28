export class Usuario {

  public id?: number;
  public idRol: number;
  public nomnbreRol?: string;
  public nombreUsuario: string;
  public correo: string;
  public contrasena: string;

  constructor( usuario?: Usuario ) { }
}
