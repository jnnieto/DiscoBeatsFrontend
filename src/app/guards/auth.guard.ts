import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService) { }

  canActivate(

    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    const helper = new JwtHelperService();

    let token = sessionStorage.getItem('token');

    if (!token || helper.isTokenExpired(token))
      this.router.navigateByUrl('/inicio-sesion');
    return true;
  }

}
