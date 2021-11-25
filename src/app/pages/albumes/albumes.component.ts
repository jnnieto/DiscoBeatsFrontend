import { Component, OnInit } from '@angular/core';
import { AlbumService } from './../../services/album.service'
import { Album } from 'src/app/models/album.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-albumes',
  templateUrl: './albumes.component.html',
  styleUrls: ['./albumes.component.css']
})
export class AlbumesComponent implements OnInit {

  formAlbumes: FormGroup;

  public albumes: Album[];

  constructor(private albumService: AlbumService, private fb: FormBuilder) { }

  ngOnInit() {

    this.obtenerListaAlbumes();

    this.formAlbumes = this.fb.group({
      id: [''],
      nombre: ['',
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(40)
      ],
      fechaLanzamiento: ['',
        Validators.required
      ],
      descripcion: ['',
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(250)
      ],
      precio: ['',
        Validators.required
      ],
      artista: ['', [
        Validators.required,
      ]],
      generoMusical: ['',
        Validators.required,
      ],
    });

  }

  obtenerListaAlbumes() {
    this.albumService.obtenerAlbumes().subscribe(data => {
      this.albumes = data;
    }, error => {
      console.log(error);
    })
  }

  agregarNuevoAlbum() {

  }

}
