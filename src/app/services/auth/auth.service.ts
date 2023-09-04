import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/enviroments';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tienda } from 'src/app/models/tienda';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService(); 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URL = environment.url;

  private loggedIn = new BehaviorSubject<boolean>(false)
  constructor(private http:HttpClient,  private route: Router) { 
    this.checkToken();
  }

  get isLogged():Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  signIn(tienda :tienda){
    return this.http.post<string>(this.URL+'/adminTienda/loginTienda',tienda).pipe(
      map((token: any) => {
        const tokenID = token.token
        this.saveToken(tokenID);
        this.loggedIn.next(true)
        return tokenID;
      })
    );
  }

  logout() :void {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
    this.route.navigate(["/admin"])
  }


  private saveToken(token: string) {
    localStorage.setItem('token',token);
  }

// Comprueba cada vez que se recarga que existe token y si ha expirado o no
  private checkToken() {
    const tiendaToken = localStorage.getItem('token');
    const isExpired = helper.isTokenExpired(tiendaToken)
    if(isExpired){
      localStorage.removeItem('token');
    }else{
      this.loggedIn.next(true);
    }
  }


}
