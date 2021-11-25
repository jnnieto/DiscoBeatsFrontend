import { Component, OnInit } from '@angular/core';
import { AlbumService } from './../../services/album.service'
import { Album } from 'src/app/models/album.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Artista } from './../../models/artista.model';
import { GeneroMusical } from 'src/app/models/genero-musical.model';
import { ArtistaService } from 'src/app/services/artista.service';
import { GeneroMusicalesService } from 'src/app/services/genero-musicales.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-albumes',
  templateUrl: './albumes.component.html',
  styleUrls: ['./albumes.component.css']
})
export class AlbumesComponent implements OnInit {

  formAlbumes: FormGroup;

  public albumes: Album[];
  public artistas: Artista[];
  public generos: GeneroMusical[];

  public rol: string;


  constructor(
    private albumService: AlbumService,
    private artistaService: ArtistaService,
    private generoService: GeneroMusicalesService,
    private authService: AuthService,
    private fb: FormBuilder) { }

  ngOnInit() {

    this.obtenerRolDeUsuario();
    this.obtenerListaAlbumes();
    this.obtenerArtistas();
    this.obtenerGenerosMusicales();

    this.formAlbumes = this.fb.group({
      id: [''],
      nombre: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(40)
      ]],
      fechaLanzamiento: ['', [
        Validators.required
      ]],
      descripcion: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(250)
      ]],
      precio: ['', [
        Validators.required
      ]],
      artista: ['', [
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

  obtenerListaAlbumes() {
    this.albumService.obtenerAlbumes().subscribe(data => {
      this.albumes = data;
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

  obtenerGenerosMusicales() {
    this.generoService.obtenerGenerosMusicales().subscribe(data => {
      this.generos = data;
    }, error => {
      console.log(error);
    })
  }

  agregarNuevoAlbum() {

    let album = new Album();

    album.nombre = this.formAlbumes.get('nombre').value;
    album.fechaLanzamiento = this.formAlbumes.get('fechaLanzamiento').value;
    album.descripcion = this.formAlbumes.get('descripcion').value;
    album.precio = this.formAlbumes.get('precio').value;
    album.idArtista = this.formAlbumes.get('artista').value;
    album.idGeneroMusical = this.formAlbumes.get('generoMusical').value;

    this.albumService.agregarNuevoAlbum(album).subscribe( () => {
      Swal.fire('Álbum agregado satisfactoriamente', '', 'success')
    }, error => {
      Swal.fire('Oops! Ha ocurrido un error', error.error.error , 'error')
    })
  }

  editarArtista() {

  }

  eliminarAlbumPorId(album: Album) {

    Swal.fire({
      title: `¿Estás seguro que deseas eliminar el álbum ${ album.nombre }?`,
      text: 'Una vez realizada esta acción no se puede revertir',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar',
      cancelButtonText: 'No, Cancelar'
  }).then((result) => {
    if(result.isConfirmed) {
      this.albumService.eliminarAlbum(album.id).subscribe( () => {
        Swal.fire('Eliminado!','Álbum eliminado satisfactoriamente', 'success')
      }, error => {
        Swal.fire('Oops! Ha ocurrido un error', error.error.error , 'error')
      })
    }
  })

  }

}
