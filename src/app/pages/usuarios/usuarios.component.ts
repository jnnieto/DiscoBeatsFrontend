import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { Rol } from './../../models/roles.model';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuario } from './../../models/usuario.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: [ ]
})
export class UsuariosComponent implements OnInit {

  formUsuarios: FormGroup;

  public usuarios: Usuario[];
  public roles: Rol[];
  public rol: string;

  constructor(
    private authService: AuthService,
    private usuarioService: UsuariosService,
    private fb: FormBuilder) { }

  ngOnInit() {

    this.obtenerRolDeUsuario();
    this.obtenerListaRolesDeUsuario();
    this.obtenerListaUsuarios();

    this.formUsuarios = this.fb.group({
      id: [''],
      nombreUsuario: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15)
      ]],
      correo: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(30)
      ]],
      contrasena: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(25)
      ]],
      rolUsuario: ['', [
        Validators.required,
      ]],
    });

  }

  obtenerRolDeUsuario() {
    this.rol = this.authService.decodeToken.rol;
  }

  obtenerListaRolesDeUsuario() {
    return this.usuarioService.obtenerRoles().subscribe(data => {
      this.roles = data;
    }, error => {
      console.log(error);
    })
  }

  obtenerListaUsuarios() {
    this.usuarioService.obtenerUsuarios().subscribe(data => {
      this.usuarios = data;
    }, error => {
      console.log(error);
    })
  }

  agregarNuevoUsuario() {

    let usuario = new Usuario();

    usuario.idRol = this.formUsuarios.get('rolUsuario').value;
    usuario.nombreUsuario = this.formUsuarios.get('nombreUsuario').value;
    usuario.correo = this.formUsuarios.get('correo').value;
    usuario.contrasena = this.formUsuarios.get('contrasena').value;

    this.usuarioService.agregarNuevoUsuario(usuario).subscribe(async () => {
      Swal.fire('Usuario agregado satisfactoriamente', '', 'success')
      await this.delay(2000);
      window.location.reload();
    }, error => {
      Swal.fire('Oops! Ha ocurrido un error', error.error.error, 'error')
    })

  }

  cargarInformacionUsuario(usuario: Usuario) {

    this.formUsuarios = this.fb.group({
      id: [ usuario.id ],
      nombreUsuario: [ usuario.nombreUsuario , [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15)
      ]],
      correo: [ usuario.correo , [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(30)
      ]],
      contrasena: [ usuario.contrasena , [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(25)
      ]],
      rolUsuario: [ '' , [
        Validators.required,
      ]],
    });
  }

  editarUsuario() {

    let usuario = new Usuario();

    usuario.id = this.formUsuarios.get('id').value;
    usuario.idRol = this.formUsuarios.get('rolUsuario').value;
    usuario.nombreUsuario = this.formUsuarios.get('nombreUsuario').value;
    usuario.correo = this.formUsuarios.get('correo').value;
    usuario.contrasena = this.formUsuarios.get('contrasena').value;

    this.usuarioService.actualizarUsuario(usuario).subscribe(async () => {
      Swal.fire('Usuario editado satisfactoriamente', '', 'success')
      await this.delay(2000);
      window.location.reload();
    }, error => {
      Swal.fire('Oops! Ha ocurrido un error', error.error.error, 'error')
    })

  }

  eliminarUsuario(usuario: Usuario) {

    Swal.fire({
      title: `¿Estás seguro que deseas inhabilitar temporalmente al usuario ${usuario.nombreUsuario} ?`,
      text: 'Una vez realizada esta acción no se puede revertir',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Inhabilitar',
      cancelButtonText: 'No, Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(usuario.id).subscribe( async () => {
          Swal.fire('Inhabilitado!', 'Usuario inhabilitado satisfactoriamente', 'success')
          await this.delay(2000);
          window.location.reload();
        }, error => {
          Swal.fire('Oops! Ha ocurrido un error', error.error.error, 'error')
        })
      }
    })
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
