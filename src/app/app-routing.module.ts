import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AuthRoutingModule } from './auth/auth-routing.module';
import  { PagesRoutingModule } from './pages/pages-routing.module';

import { NoPageFoundComponent } from './pages/no-page-found/no-page-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio/artistas', pathMatch: 'full' },
  { path: '**', component: NoPageFoundComponent },
]

@NgModule({
  imports: [
    RouterModule.forRoot( routes ),
    AuthRoutingModule,
    PagesRoutingModule
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
