import { Component, OnInit } from '@angular/core';
import { AlbumService } from './../../services/album.service'
import { Album } from 'src/app/models/album.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Artista } from './../../models/artista.model';
import { GeneroMusical } from 'src/app/models/genero-musical.model';
import { ArtistaService } from 'src/app/services/artista.service';
import { GeneroMusicalesService } from 'src/app/services/genero-musicales.service';
import { AuthService } from 'src/app/services/auth.service';
import { CompraService } from 'src/app/services/compra.service';
import { CompraAlbum } from 'src/app/models/compra-album.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-albumes',
  templateUrl: './albumes.component.html',
  styleUrls: []
})
export class AlbumesComponent implements OnInit {

  formAlbumes: FormGroup;

  public albumes: Album[];
  public artistas: Artista[];
  public generos: GeneroMusical[];
  public comprasAUsuario: CompraAlbum[];

  public rol: string;

  constructor(
    private albumService: AlbumService,
    private artistaService: ArtistaService,
    private generoService: GeneroMusicalesService,
    private authService: AuthService,
    private compraService: CompraService,
    private fb: FormBuilder) { }

  ngOnInit() {

    this.obtenerRolDeUsuario();
    this.obtenerListaAlbumes();
    this.cargarComprasUsuario();
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
      for(let album of this.albumes) {
        album.fueComprado = true;
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

    this.albumService.agregarNuevoAlbum(album).subscribe(async () => {
      Swal.fire('Álbum agregado satisfactoriamente', '', 'success')
      await this.delay(2000);
      window.location.reload();
    }, error => {
      Swal.fire('Oops! Ha ocurrido un error', error.error.error, 'error')
    })
  }

  cargarInformacionAlbum(album: Album) {

    this.formAlbumes = this.fb.group({
      id: [ album.id ],
      nombre: [ album.nombre, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(40)
      ]],
      fechaLanzamiento: [ album.fechaLanzamiento, [
        Validators.required
      ]],
      descripcion: [ album.descripcion, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(250)
      ]],
      precio: [ album.precio, [
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

  editarAlbum() {
    let album = new Album();

    album.id = this.formAlbumes.get('id').value;
    album.nombre = this.formAlbumes.get('nombre').value;
    album.descripcion = this.formAlbumes.get('descripcion').value;
    album.fechaLanzamiento = this.formAlbumes.get('fechaLanzamiento').value;
    album.precio = this.formAlbumes.get('precio').value;
    album.idGeneroMusical = this.formAlbumes.get('generoMusical').value;

    this.albumService.editarAlbum(album).subscribe(async () => {
      Swal.fire('Álbum editado satisfactoriamente', '', 'success')
      await this.delay(2000);
      window.location.reload();
    }, error => {
      Swal.fire('Oops! Ha ocurrido un error', error.error.error, 'error')
    })
  }

  eliminarAlbumPorId(album: Album) {

    Swal.fire({
      title: `¿Estás seguro que deseas eliminar el álbum ${album.nombre}?`,
      text: 'Una vez realizada esta acción no se puede revertir',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar',
      cancelButtonText: 'No, Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.albumService.eliminarAlbum(album.id).subscribe(async () => {
          Swal.fire('Eliminado!', 'Álbum eliminado satisfactoriamente', 'success')
          await this.delay(2000);
          window.location.reload();
        }, error => {
          Swal.fire('Oops! Ha ocurrido un error', error.error.error, 'error')
        })
      }
    })
  }

  comprarAlbum(album: Album) {
    Swal.fire({
      title: `¿Estás seguro que deseas comprar el álbum ${album.nombre}?`,
      text: 'Una vez realizada esta acción, podrás disfrutar y reproduccir este álbum  las veces que desees desde tu perfil',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#06D79C',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, realizar compra',
      cancelButtonText: 'No, Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {

        let compraAlbum = new CompraAlbum();

        compraAlbum.idAlbum = album.id;
        compraAlbum.idUsuario = this.authService.decodeToken.sub;
        compraAlbum.precioTotal = album.precio;

        this.compraService.realizarCompraAlbum(compraAlbum).subscribe(async () => {
          Swal.fire('Felicidades!', `Has realizado satistactoriamente la compra del álbum ${ album.nombre }`, 'success')
          await this.delay(2000);
          window.location.reload();
        }, error => {
          Swal.fire('Oops! Ha ocurrido un error', error.error.error, 'error')
        })
      }
    })
  }

  cargarComprasUsuario() {
    this.compraService.obtenerComprasAUsuario(this.authService.decodeToken.sub).subscribe( data => {
      this.comprasAUsuario = data;
      this.validarAlbumesComprados();
    })

  }

  validarAlbumesComprados() {
    if (this.rol !== 'Administrador' && this.comprasAUsuario) {
      for(let album of this.albumes) {
        for(let compra of this.comprasAUsuario) {
          if(compra.idAlbum === album.id) {
            album.fueComprado = false;
          }
        }
      }
    }
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  resetearForm() {
    this.formAlbumes.reset();
    this.formAlbumes.markAsPristine;
    this.formAlbumes.markAsTouched;
  }
}
