import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneroMusical } from './../../models/genero-musical.model';
import { GeneroMusicalesService } from 'src/app/services/genero-musicales.service';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-generos',
  templateUrl: './generos.component.html',
  styleUrls: [ './generos.component.css' ]
})
export class GenerosComponent implements OnInit {

  formGeneros: FormGroup;

  public generos: GeneroMusical[];
  public rol: string;

  constructor(
    private generoService: GeneroMusicalesService,
    private authService: AuthService,
    private fb: FormBuilder) { }

  ngOnInit(): void {

    this.obtenerListaGenerosMusicales();
    this.obtenerRolDeUsuario();

    this.formGeneros = this.fb.group({
      id: [''],
      nombreGenero: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15)
      ]],
    });
  }

  obtenerRolDeUsuario() {
    this.rol = this.authService.decodeToken.rol;
  }

  obtenerListaGenerosMusicales() {
    this.generoService.obtenerGenerosMusicales().subscribe(data => {
      this.generos = data;
    }, error => {
      console.log(error);
    })
  }

  agregarNuevoGenero() {
    let genero = new GeneroMusical();

    genero.nombreGeneroMusical = this.formGeneros.get('nombreGenero').value;

    this.generoService.agregarNuevogeneroMusical(genero).subscribe(async () => {
      Swal.fire('Género musical agregado satisfactoriamente', '', 'success')
      await this.delay(2000);
      window.location.reload();
    }, error => {
      Swal.fire('Oops! Ha ocurrido un error', error.error.error, 'error')
    })
  }

  cargarInfoGeneroMusical(genero: GeneroMusical) {

    this.formGeneros = this.fb.group({
      id: [ genero.id ],
      nombreGenero: [ genero.nombreGeneroMusical, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15)
      ]],
    });
  }

  editarGeneroMusical() {

    let genero = new GeneroMusical();

    genero.id = this.formGeneros.get('id').value;
    genero.nombreGeneroMusical = this.formGeneros.get('nombreGenero').value;

    this.generoService.editarGeneroMusical(genero).subscribe(async () => {
      Swal.fire('Género musical editado satisfactoriamente', '', 'success')
      await this.delay(2000);
      window.location.reload();
    }, error => {
      Swal.fire('Oops! Ha ocurrido un error', error.error.error, 'error')
    })

  }

  eliminarGeneroMusical(genero: GeneroMusical) {

    Swal.fire({
      title: `¿Estás seguro que deseas eliminar el género ${genero.nombreGeneroMusical} ?`,
      text: 'Una vez realizada esta acción no se puede revertir',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar',
      cancelButtonText: 'No, Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.generoService.eliminarGeneroMusical(genero.id).subscribe( async () => {
          Swal.fire('Eliminado!', 'Género musical eliminado satisfactoriamente', 'success')
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

  resetearForm() {
    this.formGeneros.reset();
    this.formGeneros.markAsPristine;
    this.formGeneros.markAsTouched;
  }
}
