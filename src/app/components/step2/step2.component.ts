import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { alimento } from 'src/app/models/alimento';
import { ProductoService } from 'src/app/services/productos/producto.service';
import { DialogPedirProductoComponent } from '../dialogsAlimentos/dialog-pedir-producto/dialog-pedir-producto.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PedidoService } from 'src/app/services/pedidos/pedido.service';


@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss']
})
export class Step2Component {
  constructor(private productService: ProductoService,private pedidoService: PedidoService,private dialog: MatDialog,@Inject('ALERGENOS') public arrAlergenos: any[]){}

  // @Output() rellenarHamburguesas = new EventEmitter();
  arrHamburguesas:alimento[];
  dialogRefAnadir: MatDialogRef<DialogPedirProductoComponent>;
  alergenosAux = [...this.arrAlergenos];
  hamburguesasFiltradas:alimento[]
  ngOnInit() {
    this.productService.getProduct$.subscribe(data =>{
      this.arrHamburguesas = data.filter(item => item.tipoAlimento == "Hamburguesa")
      
      this.hamburguesasFiltradas =data.filter(item => item.tipoAlimento == "Hamburguesa")
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
        console.log(result);
        this.pedidoService.disparadorStep2.emit(result);
      });
    }

    cambioEstado(posicion: number) {
      this.alergenosAux[posicion].estado == true ? this.alergenosAux[posicion].estado = false : this.alergenosAux[posicion].estado = true;
      this.filtrarHamburguesas();
    }

    filtrarHamburguesas(){
      let alergenosFiltro = this.alergenosAux.filter(alergeno => alergeno.estado).map(alergeno => alergeno.nombre);
      let arrauAuxHamburguesas = [...this.arrHamburguesas];

      this.hamburguesasFiltradas = arrauAuxHamburguesas.filter(hamburguesa => {
        // Buscamos si la hamburguesa tiene algún alergeno que esté en el arreglo alergenosFiltro
        let tieneAlergenos = hamburguesa.alergenos.some(alergeno => alergenosFiltro.includes(alergeno.nombre));
        // Devolvemos el valor contrario, es decir, si la hamburguesa NO tiene esos alergenos
        return !tieneAlergenos;
      });
    }

    rellenarHamburguesas(){
      this.hamburguesasFiltradas = this.arrHamburguesas
    }
}


