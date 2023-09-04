import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CheckUserTiendaGuard implements CanActivate {
  constructor (private route:Router, private authService: AuthService) { }
  canActivate():Observable<boolean>{
    return this.authService.isLogged.pipe(
      take(1),
      map((isLogged : boolean) =>{
        if (!isLogged){
          this.route.navigate(['/admin']);
        }
        return isLogged
      }  )
    )
  }
  
}
