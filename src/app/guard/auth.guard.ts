import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  userStatus!:boolean;

  constructor(private auth: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.auth.isAuthenticated.subscribe({
      next: (data) => {
        if(data){
          this.userStatus = data;
        }
        else {
          this.userStatus = data;
        }
      }
    });

    if(this.userStatus) {
      return true;
    }
    this.router.navigateByUrl("/login")
    return false;
  }
  
}
