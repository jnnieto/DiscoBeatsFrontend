import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompraAlbum } from 'src/app/models/compra-album.model';
import { CompraCancion } from 'src/app/models/compra-cancion.model';
import { AuthService } from 'src/app/services/auth.service';
import { CompraService } from 'src/app/services/compra.service';
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

  public usuario: Usuario;

  public cancionesCompradas: CompraCancion[];

  public albumesComprados: CompraAlbum[];

  public formUsuario: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuariosService,
    private authService: AuthService,
    private compraService: CompraService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.obtenerInfoUser(data.id);
    });

  }

  obtenerInfoUser(id: string) {
    this.usuarioService.obtenerUsuario(id).subscribe(data => {
      this.usuario = data[0];
      this.formUsuario = this.fb.group({
        nombre: [this.usuario.nombreUsuario , [
          Validators.required,
          Validators.minLength(3)
        ] ],
        correo: [this.usuario.correo, [
          Validators.required,
          Validators.email,
        ] ],
        contrasena: [this.usuario.contrasena, [
          Validators.required,
          Validators.minLength(6)
        ]]
      });
      this.obtenerCompras(this.usuario.id);
    })
  }

  actualizarInfo() {
    Swal.fire({
      title: `¿Estás seguro que deseas actualizar tu información?`,
      text: 'Una vez realizada esta acción no se puede revertir',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, actualizar',
      cancelButtonText: 'No, cancelar'
  }).then((result) => {
    if(result.isConfirmed) {
      this.usuario.nombreUsuario = this.formUsuario.get('nombre').value;
      this.usuario.correo = this.formUsuario.get('correo').value;
      this.usuario.contrasena = this.formUsuario.get('contrasena').value;
      this.usuarioService.actualizarUsuario(this.usuario).subscribe(() => {
        Swal.fire('Editado!!','Información editada satisfactoriamente', 'success');
      }, error => {
        Swal.fire('Error', error.error.error, 'error')
      });
    }
  });
  }

  cerrarSesion() {
    this.authService.cerrarSesion(this.authService.decodeToken.correo).subscribe(() => {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('email');
      sessionStorage.removeItem('pass');
      this.router.navigate(['inicio-sesion'])
    }, error => console.log(error))
  }

  obtenerCompras(id: number) {
    this.compraService.obtenerComprasAUsuario(id.toString()).subscribe(data => {
      this.albumesComprados = data;
    }, error => console.log(error));
    this.compraService.obtenerComprasCUsuario(id.toString()).subscribe(data => {
      this.cancionesCompradas = data;
    }, error => console.log(error));
  }

}
