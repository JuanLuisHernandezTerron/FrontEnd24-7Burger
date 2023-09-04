import { Component, Inject } from '@angular/core';
import { alimento } from 'src/app/models/alimento';
import { ProductoService } from 'src/app/services/productos/producto.service';
import { DialogPedirProductoComponent } from '../dialogsAlimentos/dialog-pedir-producto/dialog-pedir-producto.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PedidoService } from 'src/app/services/pedidos/pedido.service';


@Component({
  selector: 'app-step4',
  templateUrl: './step4.component.html',
  styleUrls: ['./step4.component.scss']
})
export class Step4Component {
  constructor(private productService: ProductoService,private dialog: MatDialog,private pedidoService: PedidoService,@Inject('ALERGENOS') public arrAlergenos: any[]){}
  arrPostres:alimento[];
  dialogRefAnadir: MatDialogRef<DialogPedirProductoComponent>;
  alergenosAux = [...this.arrAlergenos];
  postresFiltrados:alimento[]
  ngOnInit() {
    this.productService.getProduct$.subscribe(data =>{
      this.arrPostres = data.filter(item => item.tipoAlimento == "Postre")
      this.postresFiltrados =data.filter(item => item.tipoAlimento == "Postre")
    })
  }

  
  pedirProducto(enterAnimationDuration: string, exitAnimationDuration: string, event:Event):void{
    let evento = event.currentTarget as Element
      this.dialogRefAnadir = this.dialog.open(DialogPedirProductoComponent, {
        width: '60%',
        enterAnimationDuration,
        exitAnimationDuration,
        data : evento.id
      });    

      this.dialogRefAnadir.afterClosed().subscribe(result => {
        this.pedidoService.disparadorStep2.emit(result);
      });

    }

    cambioEstado(posicion: number) {
      this.alergenosAux[posicion].estado == true ? this.alergenosAux[posicion].estado = false : this.alergenosAux[posicion].estado = true;
      this.filtrarPostres();
    }

    filtrarPostres(){
      let alergenosFiltro = this.alergenosAux.filter(alergeno => alergeno.estado).map(alergeno => alergeno.nombre);
      let arrAuxPostres = [...this.arrPostres];

      this.postresFiltrados = arrAuxPostres.filter(postre => {
        // Buscamos si la hamburguesa tiene algún alergeno que esté en el arreglo alergenosFiltro
        let tieneAlergenos = postre.alergenos.some(alergeno => alergenosFiltro.includes(alergeno.nombre));
        // Devolvemos el valor contrario, es decir, si la hamburguesa NO tiene esos alergenos
        return !tieneAlergenos;
      });

    }
    rellenarPostres(){
      this.postresFiltrados = this.arrPostres
    }

}
