import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogActualizarBebidaComponent } from 'src/app/components/dialogsAlimentos/dialog-actualizar-bebida/dialog-actualizar-bebida.component';
import { DialogBebidaComponent } from 'src/app/components/dialogsAlimentos/dialog-bebida/dialog-bebida.component';
import { DialogBorrarAlimentoComponent } from 'src/app/components/dialogsAlimentos/dialog-borrar-alimento/dialog-borrar-alimento.component';
import { alimento } from 'src/app/models/alimento';
import { ProductoService } from 'src/app/services/productos/producto.service';

@Component({
  selector: 'app-lista-bebidas-admin',
  templateUrl: './lista-bebidas-admin.component.html',
  styleUrls: ['./lista-bebidas-admin.component.scss']
})
export class ListaBebidasAdminComponent {
  public isActive = false;
  dialogRef: MatDialogRef<DialogBebidaComponent>;
  dialogRefBorrar: MatDialogRef<DialogBorrarAlimentoComponent>;
  dialogRefActualizar: MatDialogRef<DialogActualizarBebidaComponent>;
  arrBebida: alimento[];
  constructor(public dialog: MatDialog, private productService: ProductoService) { }

  ngOnInit(): void {
    this.productService.getProduct$.subscribe(productos=>{
      console.log(productos);
      this.arrBebida = productos.filter(e=>e.tipoAlimento == "Bebida");
    })
  }

  anadirProducto(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialogRef = this.dialog.open(DialogBebidaComponent, {
      width: 'auto',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  public toggleBebida() {
      this.isActive = !this.isActive;
  }

  borrarProducto(enterAnimationDuration: string, exitAnimationDuration: string, event: Event): void {
    const target = event.target as HTMLElement;
    const idBurger = target.id;
    console.log(idBurger);
    

    this.dialogRefBorrar = this.dialog.open(DialogBorrarAlimentoComponent, {
      width: 'auto',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    this.dialogRefBorrar.afterClosed().subscribe(data => {
      if(data==true){
        this.productService.eliminarProducto(idBurger).subscribe(data => {
        this.productService.modificarLista(data["alimentos"])
      })
      }
    });
  }

  actualizarProducto(enterAnimationDuration: string, exitAnimationDuration: string, event:Event):void{
    this.dialogRefActualizar = this.dialog.open(DialogActualizarBebidaComponent, {
      width: '60%',
      enterAnimationDuration,
      exitAnimationDuration,
    });    
    //Envio el evento para que desde el output del service el otro componente pueda recoger el evento enviado desde este propio componente.
    setTimeout(()=>{
      this.productService.diparadoActualizarProducto.emit(event);
    },200);
  }
}
