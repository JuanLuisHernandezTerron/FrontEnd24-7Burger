import {Component } from '@angular/core';
import { alimento } from 'src/app/models/alimento';
import { ProductoService } from 'src/app/services/productos/producto.service';
import { PedidoService } from 'src/app/services/pedidos/pedido.service';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.scss'],

})
export class Step3Component {
  constructor(private productService: ProductoService, private pedidoService: PedidoService) { }
  arrBebidas: alimento[];
  pedido = {
    id_alimento: '' || undefined,
    cantidad: 1,
  };
  
  ngOnInit() {
    this.productService.getProduct$.subscribe(data => {
      this.arrBebidas = data.filter(item => item.tipoAlimento == "Bebida")
    })
  }

  /**
   * @param event devuelve la cantidad del input 
   */

  insertBebida(id: string, event: any) {
    this.pedido.id_alimento = id;
    this.pedido.cantidad = event;
    console.log(this.pedido);

    this.pedidoService.disparadorStep3.emit(this.pedido);
  }
}
