import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';
import { Usuario } from './../../models/usuario.model';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styles: [
  ]
})
export class PerfilUsuarioComponent implements OnInit {

  private id: number;

  public rol: string = '';

  public usuario: Usuario;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuariosService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.rol = this.getRol();
    this.route.params.subscribe(data => {
      this.obtenerInfoUser(data.id);
    });
  }

  obtenerInfoUser(id: string) {
    this.usuarioService.obtenerUsuario(id).subscribe(data => {
      this.usuario = data[0];
    })
  }

  getRol(): string {
    return this.authService.decodeToken.rol;
  }

  actualizarInfo() {
    this.usuarioService.actualizarUsuario(this.usuario).subscribe(() => {
      Swal.fire('Información editada satisfactoriamente', 'success');
    }, error => {
      Swal.fire('Error', error.error.error, 'error')
    })
  }

  cerrarSesion() {
    this.authService.cerrarSesion(this.authService.decodeToken.correo).subscribe(() => {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('email');
      sessionStorage.removeItem('pass');
      this.router.navigate(['inicio-sesion'])
    }, error => console.log(error))
  }

}
