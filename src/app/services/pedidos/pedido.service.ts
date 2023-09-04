import { EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { environment } from 'src/enviroments/enviroments';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, observeOn } from 'rxjs';
import { pedido } from 'src/app/models/pedido';;

@Injectable({
  providedIn: 'root'
})
export class PedidoService{
  private URL = environment.url;
  arrayPedido: pedido[] = [];  
  private _productPedido$: BehaviorSubject<pedido> = new BehaviorSubject(null);
  private _pedidoAdmin$: BehaviorSubject<pedido[]> = new BehaviorSubject([]);

  @Output() disparadorStep1 = new EventEmitter();
  @Output() disparadorStep2 = new EventEmitter();
  @Output() disparadorStep3 = new EventEmitter();
  @Output() cantidadProducto = new EventEmitter();
  @Output() cantidadBebida = new EventEmitter();
  private _pedidoCarrito$: BehaviorSubject<any[]> = new BehaviorSubject([]);

  constructor(private http: HttpClient) { 
    this.getPedido();
  }


    
  setPedido(pedido:any){
    this._pedidoCarrito$.next(pedido);

  }

  get getPedidoCarrito$():Observable<any>{
    return this._pedidoCarrito$.asObservable();
  }
  pedidoPendiente(pedido){   
    this._productPedido$.next(pedido);
  }

  agregarPedido(pedido: pedido){
    return this.http.post<string>(this.URL + '/pedidoCliente/newPedido', pedido)
  }

  getPedido(){
    return this.http.get<pedido[]>(this.URL + '/pedidoCliente/getPedidos',{}).subscribe(data=>{
      this.introducirPedido(data);
    });
  }

  modificarEstadoPedido(pedido:pedido){
    return this.http.put<any>(this.URL+'/pedidoCliente/pedidoEnProceso',pedido);
  }

  FinalizarPedido(pedido:pedido){
    return this.http.put<any>(this.URL+'/pedidoCliente/pedidoFinalizado',pedido);
  }

  introducirPedido(pedido){
    this._pedidoAdmin$.next(pedido);
  }

  get getPedidoAdmin$():Observable<pedido[]>{
    return this._pedidoAdmin$.asObservable();
  }

  get getPedido$():Observable<pedido>{
    return this._productPedido$.asObservable();
  }

}
