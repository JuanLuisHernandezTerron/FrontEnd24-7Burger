import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class TiendaService {
  private URL = environment.url;

  constructor(private http:HttpClient) { }

  sendConsulta(consulta:any){
    console.log(consulta);
    console.log(this.URL);
    return this.http.post<any>(this.URL+'/datosCliente/consulta',consulta);
  }
}
