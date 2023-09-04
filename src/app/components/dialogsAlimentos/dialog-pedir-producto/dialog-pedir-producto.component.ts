import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from 'src/app/services/productos/producto.service';
import { PedidoService } from 'src/app/services/pedidos/pedido.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogOmitirPasoComponent } from '../../dialog-omitir-paso/dialog-omitir-paso.component';

@Component({
  selector: 'app-dialog-pedir-producto',
  templateUrl: './dialog-pedir-producto.component.html',
  styleUrls: ['./dialog-pedir-producto.component.scss']
})
export class DialogPedirProductoComponent {
  constructor(private fb: FormBuilder, private productService: ProductoService, private pedidoService: PedidoService,@Inject(MAT_DIALOG_DATA) public data: any) {
  }
  public dialogRef: MatDialogRef<DialogOmitirPasoComponent>;
  idProducto: String;
  arrAlimentos: any[];
  pedido={
    id_alimento:this.data || undefined,
    cantidad:1,
    extras:[]
  };
  
  ngOnInit(): void {
    this.productService.getProduct$.subscribe(products => {
      this.arrAlimentos = products.filter(p=> p._id === this.data)
      this.idProducto = this.data;     
    })
  }

  pushExtras(event:any,nombreExtra:String,precioExtra:Number){
    if (event.checked) {
      this.pedido.extras.push({nombre:nombreExtra,precio:precioExtra})
    }else{
      this.pedido.extras = this.pedido.extras.filter(p => p.nombre !== nombreExtra);
    }
  }
}
