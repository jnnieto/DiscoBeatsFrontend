import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from '../auth/register/register.component'
import { LoginComponent } from '../auth/login/login.component';

const routes: Routes = [
  { path: 'registro', component: RegisterComponent },
  { path: 'inicio-sesion', component: LoginComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
