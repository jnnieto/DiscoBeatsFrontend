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
import Swal from 'sweetalert2';

@Component({
  selector: 'app-canciones',
  templateUrl: './canciones.component.html',
  styleUrls: ['./canciones.component.css']
})
export class CancionesComponent implements OnInit {

  formCanciones: FormGroup;

  public canciones: Cancion[];
  public artistas: Artista[];
  public albumes: Album[];
  public generos: GeneroMusical[];

  public rol: string;

  constructor(
    private cancionService: CancionService,
    private albumService: AlbumService,
    private artistaService: ArtistaService,
    private generoService: GeneroMusicalesService,
    private authService: AuthService,
    private fb: FormBuilder) { }

  ngOnInit() {

    this.obtenerRolDeUsuario();
    this.obtenerListaCanciones();
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
      console.log(this.canciones)
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
    cancion.idGenero = this.formCanciones.get('generoMusical').value;

    this.cancionService.agregarNuevaCancion(cancion).subscribe( () => {
      Swal.fire('Canción agregada satisfactoriamente', '', 'success')
    }, error => {
      Swal.fire('Oops! Ha ocurrido un error', error.error.error , 'error')
    })
  }

  editarArtista() {

  }

  eliminarCancionPorId(cancion: Cancion) {

    Swal.fire({
      title: `¿Estás seguro que deseas eliminar la canción ${ cancion.nombre }?`,
      text: 'Una vez realizada esta acción no se puede revertir',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar',
      cancelButtonText: 'No, Cancelar'
  }).then((result) => {
    if(result.isConfirmed) {
      this.cancionService.eliminarCancion(cancion.id).subscribe( () => {
        Swal.fire('Eliminado!','Canción eliminada satisfactoriamente', 'success')
      }, error => {
        Swal.fire('Oops! Ha ocurrido un error', error.error.error , 'error')
      })
    }
  })

  }
}
