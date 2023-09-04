import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from 'src/app/services/productos/producto.service';
import { PedidoService } from 'src/app/services/pedidos/pedido.service';
@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss']
})
export class Step1Component {
  
  constructor(private builder: FormBuilder, private productService: ProductoService, private pedidoService:PedidoService){}
  ngOnInit() {
  }
  
  step1 = this.builder.group({
    metodoEntrega:this.builder.control("",Validators.required)
  })
  metodoEntrega(metodo){
    this.step1.get('metodoEntrega').setValue(metodo)
    this.pedidoService.disparadorStep1.emit(metodo);
    
    this.productService.nextStepper.emit(true);
    
  }
}
