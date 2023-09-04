import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Parallax from 'parallax-js'
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProductoService } from 'src/app/services/productos/producto.service';
import { PedidoService } from 'src/app/services/pedidos/pedido.service';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  constructor(private route: ActivatedRoute, private authService: AuthService, private serviceProduct:ProductoService, private pedidoService: PedidoService){

  }
  isLoggedIn = false;
  cantidadCarrito = 0;

  ngOnInit() {
    this.authService.isLogged.subscribe(res=>{
      this.isLoggedIn = res;      
    })

    this.pedidoService.cantidadProducto.subscribe((cantidad)=>{
      this.cantidadCarrito = cantidad;
    })
  }

  logout(){
    this.authService.logout();
  }

  navegationPedido(){
   return (window.location.href.split('/')[3] == "pedido") ? true : false; 
  }

  abrirCarrito(){
    this.serviceProduct.diparadorCarrito.emit(true);
  }
}
