import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Album } from 'src/app/models/album.model';
import { AuthService } from 'src/app/services/auth.service';
import { Cancion } from '../../models/cancion.model';
import { CancionService } from './../../services/cancion.service';
import { Artista } from './../../models/artista.model';
import { GeneroMusical } from 'src/app/models/genero-musical.model';
import { AlbumService } from 'src/app/services/album.service';
import { ArtistaService } from 'src/app/services/artista.service';
import { GeneroMusicalesService } from './../../services/genero-musicales.service';
import { CompraService } from 'src/app/services/compra.service';
import Swal from 'sweetalert2';
import { CompraCancion } from 'src/app/models/compra-cancion.model';

@Component({
  selector: 'app-canciones',
  templateUrl: './canciones.component.html',
  styleUrls: []
})
export class CancionesComponent implements OnInit {

  formCanciones: FormGroup;

  public canciones: Cancion[];
  public artistas: Artista[];
  public albumes: Album[];
  public generos: GeneroMusical[];
  public comprasCUsuario: CompraCancion[];

  public rol: string;

  constructor(
    private cancionService: CancionService,
    private albumService: AlbumService,
    private artistaService: ArtistaService,
    private generoService: GeneroMusicalesService,
    private authService: AuthService,
    private compraService: CompraService,
    private fb: FormBuilder) { }

  ngOnInit() {

    this.obtenerRolDeUsuario();
    this.obtenerListaCanciones();
    this.cargarComprasUsuario();
    this.obtenerArtistas();
    this.obtenerAlbumes();
    this.obtenerGenerosMusicales();

    this.formCanciones = this.fb.group({
      id: [''],
      nombre: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25)
      ]],
      fechaLanzamiento: ['', [
        Validators.required
      ]],
      reproducciones: ['', [
        Validators.required
      ]],
      duracion: ['', [
        Validators.required
      ]],
      precio: ['', [
        Validators.required
      ]],
      artista: ['', [
        Validators.required,
      ]],
      album: ['', [
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

  obtenerListaCanciones() {
    this.cancionService.obtenerCanciones().subscribe(data => {
      this.canciones = data;
      for(let cancion of this.canciones) {
        cancion.fueComprado = true;
      }
    }, error => {
      console.log(error);
    })
  }

  obtenerArtistas() {
    this.artistaService.obtenerArtistas().subscribe(data => {
      this.artistas = data;
    }, error => {
      console.log(error);
    })
  }

  obtenerAlbumes() {
    this.albumService.obtenerAlbumes().subscribe(data => {
      this.albumes = data;
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

  agregarNuevaCancion() {
    let cancion = new Cancion();

    cancion.nombre = this.formCanciones.get('nombre').value;
    cancion.fechaLanzamiento = this.formCanciones.get('fechaLanzamiento').value;
    cancion.duracion = this.formCanciones.get('duracion').value;
    cancion.reproducciones = this.formCanciones.get('reproducciones').value;
    cancion.precio = this.formCanciones.get('precio').value;
    cancion.idArtista = this.formCanciones.get('artista').value;
    cancion.idAlbum = this.formCanciones.get('album').value;
    cancion.idGeneroMusical = this.formCanciones.get('generoMusical').value;

    this.cancionService.agregarNuevaCancion(cancion).subscribe( async () => {
      Swal.fire('Canción agregada satisfactoriamente', '', 'success')
      await this.delay(2000);
      window.location.reload();
    }, error => {
      Swal.fire('Oops! Ha ocurrido un error', error.error.error, 'error')
    })
  }

  cargarInformacionCancion(cancion: Cancion) {
    this.formCanciones = this.fb.group({
      id: [ cancion.id ],
      nombre: [ cancion.nombre, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25)
      ]],
      fechaLanzamiento: [ cancion.fechaLanzamiento, [
        Validators.required
      ]],
      reproducciones: [ cancion.reproducciones, [
        Validators.required
      ]],
      duracion: [ cancion.duracion, [
        Validators.required
      ]],
      precio: [ cancion.precio, [
        Validators.required
      ]],
      artista: ['', [
        Validators.required,
      ]],
      album: ['', [
        Validators.required,
      ]],
      generoMusical: ['', [
        Validators.required,
      ]],
    });
  }

  editarCancion() {
    let cancion = new Cancion();

    cancion.id = this.formCanciones.get('id').value;
    cancion.nombre = this.formCanciones.get('nombre').value;
    cancion.fechaLanzamiento = this.formCanciones.get('fechaLanzamiento').value;
    cancion.duracion = this.formCanciones.get('duracion').value;
    cancion.reproducciones = this.formCanciones.get('reproducciones').value;
    cancion.precio = this.formCanciones.get('precio').value;
    cancion.idGeneroMusical = this.formCanciones.get('generoMusical').value;

    this.cancionService.editarCancion(cancion).subscribe( async () => {
      Swal.fire('Canción editada satisfactoriamente', '', 'success')
      await this.delay(2000);
      window.location.reload();
    }, error => {
      Swal.fire('Oops! Ha ocurrido un error', error.error.error, 'error')
    })
  }

  eliminarCancionPorId(cancion: Cancion) {

    Swal.fire({
      title: `¿Estás seguro que deseas eliminar la canción ${cancion.nombre}?`,
      text: 'Una vez realizada esta acción no se puede revertir',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar',
      cancelButtonText: 'No, Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cancionService.eliminarCancion(cancion.id).subscribe( async () => {
          Swal.fire('Eliminado!', 'Canción eliminada satisfactoriamente', 'success')
          await this.delay(2000);
          window.location.reload();
        }, error => {
          Swal.fire('Oops! Ha ocurrido un error', error.error.error, 'error')
        })
      }
    })
  }

  comprarCancion(cancion: Cancion) {
    Swal.fire({
      title: `¿Estás seguro que deseas comprar la canción ${cancion.nombre}?`,
      text: 'Una vez realizada esta acción, podrás disfrutar y reproduccir esta canción las veces que desees desde tu perfil',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#06D79C',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, realizar compra',
      cancelButtonText: 'No, Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {

        let compraCancion = new CompraCancion();

        compraCancion.idCancion = cancion.id;
        compraCancion.idUsuario = this.authService.decodeToken.sub;
        compraCancion.precioTotal = cancion.precio;

        this.compraService.realizarCompraCancion(compraCancion).subscribe(async () => {
          Swal.fire('Felicidades!', `Has realizado satistactoriamente la compra de la canción ${ cancion.nombre }`, 'success')
          await this.delay(2000);
          window.location.reload();
        }, error => {
          Swal.fire('Oops! Ha ocurrido un error', error.error.error, 'error')
        })
      }
    })
  }

  cargarComprasUsuario() {
    this.compraService.obtenerComprasCUsuario(this.authService.decodeToken.sub).subscribe( data => {
      this.comprasCUsuario = data;
      this.validarCancionesCompradas();
    })

  }

  validarCancionesCompradas() {
    if (this.rol !== 'Administrador' && this.comprasCUsuario) {
      for(let cancion of this.canciones) {
        for(let compra of this.comprasCUsuario) {
          if(compra.idCancion === cancion.id) {
            cancion.fueComprado = false;
          }
        }
      }
    }
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  resetearForm() {
    this.formCanciones.reset();
    this.formCanciones.markAsPristine;
    this.formCanciones.markAsTouched;
  }

}
