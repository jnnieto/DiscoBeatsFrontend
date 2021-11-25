import { Component, OnInit } from '@angular/core';
import { ArtistaService } from './../../services/artista.service'
import { Artista } from 'src/app/models/artista.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { GeneroMusicalesService } from './../../services/genero-musicales.service';
import { GeneroMusical } from 'src/app/models/genero-musical.model';
import Swal from 'sweetalert2';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-artistas',
  templateUrl: './artistas.component.html',
  styleUrls: ['./artistas.component.css']
})
export class ArtistasComponent implements OnInit {

  formArtistas: FormGroup;

  public artistas: Artista[];
  public generos: GeneroMusical[];

  public rol: string;

  public ocupaciones: any = [{id: 1, nombreOcupacion: 'Cantante'},
                             {id: 2, nombreOcupacion: 'DJ Profesional'},
                             {id: 3, nombreOcupacion: 'Compositor'},
                             {id: 4, nombreOcupacion: 'Grupo Musical'},
                             {id: 5, nombreOcupacion: 'Productor'} ];

  constructor(
    private artistaService: ArtistaService,
    private generoService: GeneroMusicalesService,
    private authService: AuthService,
    private fb: FormBuilder) { }

  ngOnInit() {

    this.obtenerRolDeUsuario();
    this.obtenerListaArtistas();
    this.obtenerGenerosMusicales();

    this.formArtistas = this.fb.group({
      id: [''],
      nombreArtistico: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25)
      ] ],
      nacionalidad: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20)
      ] ],
      fechaNacimiento: ['', [
        Validators.required
      ] ],
      descripcion: ['', [
        Validators.required,
        Validators.minLength(15),
        Validators.maxLength(255)
      ] ],
      ocupacion: ['', [
        Validators.required,
      ] ],
      generoMusical: ['', [
        Validators.required,
      ] ],
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

    this.artistaService.agregarNuevoArtista(artista).subscribe( () => {
      Swal.fire('Artista agregado satisfactoriamente', '', 'success')
    }, error => {
      Swal.fire('Oops! Ha ocurrido un error', error.error.error , 'error')

    }
    )
  }

  editarArtista() {

  }

  eliminarArtistaPorId(artista: Artista) {

    Swal.fire({
      title: `¿Estás seguro que deseas eliminar a ${ artista.nombreArtistico }?`,
      text: 'Una vez realizada esta acción no se puede revertir',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar',
      cancelButtonText: 'No, Cancelar'
  }).then((result) => {
    if(result.isConfirmed) {
      this.artistaService.eliminarArtista(artista.id).subscribe( () => {
        Swal.fire('Eliminado!','Artista eliminado satisfactoriamente', 'success')
      }, error => {
        Swal.fire('Oops! Ha ocurrido un error', error.error.error , 'error')
      })
    }
  })

  }

}
