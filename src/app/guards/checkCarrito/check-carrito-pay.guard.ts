import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { PedidoService } from 'src/app/services/pedidos/pedido.service';

@Injectable({
  providedIn: 'root'
})
export class CheckCarritoPayGuard implements CanActivate {
  cantidadProducto: number;

  constructor(private pedidoService: PedidoService, private route: Router, private toastr: ToastrService) {
    this.pedidoService.getPedidoCarrito$.subscribe(data => {
      this.cantidadProducto = data.length;
    })
  }
  canActivate(): boolean {
    if (this.cantidadProducto > 0) {
      return true;
    } else {
      this.route.navigate(['/pedido'])
      .then(() => {
        this.toastr.error("Introduce un producto al carrito");
        setTimeout(()=>{
          window.location.reload();
        },2000)
        });
      return false;
    }
  }
}
