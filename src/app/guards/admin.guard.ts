import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (this.decodeToken().rol === 'Administrador') {
        return true;
      } else {
        this.router.navigateByUrl('/inicio');
        return false;
      }
  }
  
  decodeToken() {
    let token = sessionStorage.getItem('token');
    const helper = new JwtHelperService();
    const decodeToken = helper.decodeToken(token);
    return decodeToken;
  }

}
