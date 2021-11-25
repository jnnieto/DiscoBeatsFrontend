import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cancion } from '../../models/cancion.model';
import { CancionService } from './../../services/cancion.service';

@Component({
  selector: 'app-canciones',
  templateUrl: './canciones.component.html',
  styleUrls: ['./canciones.component.css']
})
export class CancionesComponent implements OnInit {

  formCanciones: FormGroup;

  public canciones: Cancion[];

  constructor(private cancionService: CancionService, private fb: FormBuilder) { }

  ngOnInit() {
    this.obtenerListaCanciones();

    this.formCanciones = this.fb.group({
      id: [''],
      nombre: ['',
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25)
      ],
      fechaLanzamiento: ['',
        Validators.required
      ],
      reproducciones: ['',
        Validators.required
      ],
      duracion: ['',
        Validators.required
      ],
      precio: ['',
      Validators.required
      ],
      artista: ['', [
        Validators.required,
      ]],
      album: ['', [
        Validators.required,
      ]],
      generoMusical: ['',
        Validators.required,
      ],
    });
  }

  obtenerListaCanciones() {
    this.cancionService.obtenerCanciones().subscribe(data => {
      this.canciones = data;
      console.log(this.canciones)
    }, error => {
      console.log(error);
    })
  }

  agregarNuevaCancion() {

  }
}
