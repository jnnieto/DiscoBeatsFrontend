import { Component, OnInit } from '@angular/core';
import { UsuariosService } from './../../services/usuarios.service';
import { Rol } from './../../models/roles.model';
import { element } from 'protractor';
import { error, log } from 'console';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { Usuario } from './../../models/usuario.model';
import { Registro } from 'src/app/interfaces/registro.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [
    './register.component.css'
  ]
})
export class RegisterComponent implements OnInit {

  public registroForm = this.fb.group({
    nombreUsuario: [ '', [
      Validators.required,
      Validators.minLength(3)
    ]],
    correo: ['', [
      Validators.required,
      Validators.email,
    ]],
    rol: ['Seleccionar', [
      Validators.required
    ]],
    contrasena: ['', [
      Validators.required,
      Validators.minLength(6)
    ]],
    constrasena2: ['', [
      Validators.required,
      Validators.minLength(6)
    ]]
  })

  public roles: Rol[];
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuarioService: UsuariosService, 
    private authService: AuthService) { }

  ngOnInit(): void {
    this.getRols();

    this.registroForm;
  }

  getRols() {
    return this.usuarioService.obtenerRoles().subscribe(data => {
      this.roles = data;
    }, error => {
      console.log(error);
    })
  }

  registrarUsuario() {

    this.authService.registrarUsuario(this.convertirARegistro())
        .subscribe(() => {
          console.log('Usuario creado correctamente');
          this.router.navigate(['inicio-sesion']);
        }, error => console.warn(error.error))
    
  }

  convertirARegistro(): Registro {
    
    let registro: Registro = {
      nombreUsuario: this.registroForm.get('nombreUsuario').value,
      idRol: this.registroForm.get('rol').value,
      correo: this.registroForm.get('correo').value,
      contrasena: this.registroForm.get('contrasena').value
    }

    return registro;

  }

}
