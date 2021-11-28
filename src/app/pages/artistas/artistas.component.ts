import { Component, OnInit } from '@angular/core';
import { ArtistaService } from './../../services/artista.service'
import { Artista } from 'src/app/models/artista.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { GeneroMusicalesService } from './../../services/genero-musicales.service';
import { GeneroMusical } from 'src/app/models/genero-musical.model';
import { AuthService } from './../../services/auth.service';
import Swal from 'sweetalert2';
import { Ocupacion } from 'src/app/models/ocupacion.model';

@Component({
  selector: 'app-artistas',
  templateUrl: './artistas.component.html',
  styleUrls: []
})
export class ArtistasComponent implements OnInit {

  formArtistas: FormGroup;

  public rol: string;

  public artistas: Artista[];
  public generos: GeneroMusical[];
  public ocupaciones: Ocupacion[];

  constructor(
    private artistaService: ArtistaService,
    private generoService: GeneroMusicalesService,
    private authService: AuthService,
    private fb: FormBuilder) { }

  ngOnInit() {

    this.obtenerRolDeUsuario();
    this.obtenerListaArtistas();
    this.obtenerOcupaciones();
    this.obtenerGenerosMusicales();

    this.formArtistas = this.fb.group({
      id: [''],
      nombreArtistico: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25)
      ]],
      nacionalidad: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20)
      ]],
      fechaNacimiento: ['', [
        Validators.required
      ]],
      descripcion: ['', [
        Validators.required,
        Validators.minLength(15),
        Validators.maxLength(255)
      ]],
      ocupacion: ['', [
        Validators.required,
      ]],
      generoMusical: ['', [
        Validators.required,
      ]],
    });

  }

  obtenerRolDeUsuario() {
    this.rol = this.authService.decodeToken.rol;
  }

  obtenerListaArtistas() {
    this.artistaService.obtenerArtistas().subscribe(data => {
      this.artistas = data;
    }, error => {
      console.log(error);
    })
  }

  obtenerOcupaciones() {
    this.artistaService.obtenerOcupaciones().subscribe(data => {
      this.ocupaciones = data;
    }, error => {
      console.log(error);
    })
  }

  obtenerGenerosMusicales() {
    this.generoService.obtenerGenerosMusicales().subscribe(data => {
      this.generos = data;
    }, error => {
      console.log(error);
    })
  }

  agregarNuevoArtista() {
    let artista = new Artista();

    artista.nombreArtistico = this.formArtistas.get('nombreArtistico').value;
    artista.nacionalidad = this.formArtistas.get('nacionalidad').value;
    artista.fechaNacimiento = this.formArtistas.get('fechaNacimiento').value;
    artista.descripcion = this.formArtistas.get('descripcion').value;
    artista.idOcupacion = this.formArtistas.get('ocupacion').value;
    artista.idGeneroMusical = this.formArtistas.get('generoMusical').value;

    this.artistaService.agregarNuevoArtista(artista).subscribe(async () => {
      Swal.fire('Artista agregado satisfactoriamente', '', 'success')
      await this.delay(2000);
      window.location.reload();
    }, error => {
      Swal.fire('Oops! Ha ocurrido un error', error.error.error, 'error')
    })
  }

  cargarInformacionArtista(artista: Artista) {

    this.formArtistas = this.fb.group({
      id: [artista.id],
      nombreArtistico: [artista.nombreArtistico, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25)
      ]],
      nacionalidad: [artista.nacionalidad, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20)
      ]],
      fechaNacimiento: [artista.fechaNacimiento, [
        Validators.required
      ]],
      descripcion: [artista.descripcion, [
        Validators.required,
        Validators.minLength(15),
        Validators.maxLength(255)
      ]],
      ocupacion: ['', [
        Validators.required,
      ]],
      generoMusical: ['', [
        Validators.required,
      ]],
    });
  }

  editarArtista() {
    let artista = new Artista();

    artista.id = this.formArtistas.get('id').value;
    artista.nombreArtistico = this.formArtistas.get('nombreArtistico').value;
    artista.nacionalidad = this.formArtistas.get('nacionalidad').value;
    artista.fechaNacimiento = this.formArtistas.get('fechaNacimiento').value;
    artista.descripcion = this.formArtistas.get('descripcion').value;
    artista.idOcupacion = this.formArtistas.get('ocupacion').value;
    artista.idGeneroMusical = this.formArtistas.get('generoMusical').value;

    this.artistaService.editarArtista(artista).subscribe(async () => {
      Swal.fire('Artista editado satisfactoriamente', '', 'success')
      await this.delay(2000);
      window.location.reload();
    }, error => {
      Swal.fire('Oops! Ha ocurrido un error', error.error.error, 'error')
    })
  }

  eliminarArtistaPorId(artista: Artista) {

    Swal.fire({
      title: `¿Estás seguro que deseas eliminar a ${artista.nombreArtistico}?`,
      text: 'Una vez realizada esta acción no se puede revertir',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar',
      cancelButtonText: 'No, Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.artistaService.eliminarArtista(artista.id).subscribe(async () => {
          Swal.fire('Eliminado!', 'Artista eliminado satisfactoriamente', 'success')
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
    this.formArtistas.reset();
    this.formArtistas.markAsPristine;
    this.formArtistas.markAsTouched;
  }
}
