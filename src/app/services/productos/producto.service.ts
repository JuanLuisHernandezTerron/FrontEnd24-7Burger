import { EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { alimento } from 'src/app/models/alimento';
import { environment } from 'src/enviroments/enviroments';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, observeOn } from 'rxjs';
import { pedido } from 'src/app/models/pedido';

@Injectable({
  providedIn: 'root'
})
export class ProductoService implements OnInit {
  private URL = environment.url;
  arrayProducto: alimento[] = [];  

  private _productHamburguesa$: BehaviorSubject<alimento[]> = new BehaviorSubject([]);

  @Output() diparadoActualizarProducto = new EventEmitter();
  @Output() nextStepper = new EventEmitter();
  @Output() diparadorCarrito = new EventEmitter();

  constructor(private http: HttpClient) {
    this.getAllProduct();  
  }
  
  agregarProduct(alimento: alimento){
    this.arrayProducto.push(alimento);
    this._productHamburguesa$.next(this.arrayProducto);
  }
  
  
  get getProduct$():Observable<alimento[]>{
    return this._productHamburguesa$.asObservable();
  }
 
  ngOnInit(): void {
    this.getAllProduct();
  }
  
  ingresarProducto(productoAlimento: FormData) {
    return this.http.post<alimento[]>(this.URL + '/alimentos/newAlimento', productoAlimento);
  }

  eliminarProducto(idBurger:string){
     return this.http.delete(this.URL+'/alimentos/deleteAlimento/'+ idBurger)
  }

  getAllProduct(){
     this.http.get<any>(this.URL+'/alimentos/getAllAlimento',{}).subscribe(responseData => {
      this.modificarLista(responseData)
      });
  }

  modificarProducto(id:String,productoAlimento: FormData){
    return this.http.put<any>(this.URL+'/alimentos/updateAlimento/'+id,productoAlimento);
  }

  modificarLista(alimentos){
    this._productHamburguesa$.next(alimentos)
  }
}
