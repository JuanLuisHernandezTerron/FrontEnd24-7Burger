/**
 * !IMPORTANTE! OPTIMIZAR PROXIMAMENTE EL CODIGO
 */

import { MatStepper } from '@angular/material/stepper';
import { environment } from 'src/enviroments/enviroments';
import { Component, Inject, OnInit, ViewChild} from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { MatDrawer } from '@angular/material/sidenav';
import { ProductoService } from 'src/app/services/productos/producto.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogOmitirPasoComponent } from 'src/app/components/dialog-omitir-paso/dialog-omitir-paso.component';
import { pedido } from 'src/app/models/pedido';
import { alimento } from 'src/app/models/alimento';
import { PedidoService } from 'src/app/services/pedidos/pedido.service';
import { Router } from '@angular/router';
import { Step2Component } from 'src/app/components/step2/step2.component';
import { Step4Component } from 'src/app/components/step4/step4.component';
@Component({
  selector: 'app-proceso-pedido',
  templateUrl: './proceso-pedido.component.html',
  styleUrls: ['./proceso-pedido.component.scss'],
  viewProviders: [MatExpansionPanel],
})

export class ProcesoPedidoComponent implements OnInit {
  @ViewChild(Step2Component) step2!: Step2Component;
  @ViewChild(Step4Component) step4!: Step4Component;
  isEditable = false;
  step1 = false;
  showFiller = false;
  dialogRefOmitir: MatDialogRef<DialogOmitirPasoComponent>;
  arrPedidos: Array<pedido>;
  arrAlimento: Array<alimento>;
  productos = 0;
  precio = 0;
  pedidoCompleto:any = {
    datos_pedido: [],
    recogida_envio: '',
    estado_pedido: 'En espera',
    id_tienda: environment.id_tienda,
    datos_cliente:{
      nombre: null,
      telefono: null,
      direccion: null,
      dni: null,
    },
  };
  alergenosAux = [...this.arrAlergenos];
  CarritoAUX = [];

  constructor(private productService: ProductoService, private dialog: MatDialog, private pedidoService: PedidoService,@Inject('ALERGENOS') public arrAlergenos: any[],private route:Router) { }

  @ViewChild('drawer') miInput: MatDrawer;
  @ViewChild('stepper') stepper: MatStepper;

  ngOnInit() {
    this.productService.getProduct$.subscribe((data) => {
      this.arrAlimento = data;
    })    

    this.productService.getAllProduct();
    this.productService.nextStepper.subscribe(stepperAux => {
      if (stepperAux) {
        this.stepper.selected.completed = true;
        this.stepper.selected.editable = true;
        this.stepper.next();
      }
    })

    this.productService.diparadorCarrito.subscribe(data => {
      if (data) {
        this.miInput.toggle()
      }
    })

    this.pedidoService.disparadorStep2.subscribe(data => {
      let informacionProducto = this.arrAlimento.filter((producto) => producto?._id === data?.id_alimento);
      if (this.pedidoCompleto.datos_pedido?.length == 0) {
        if (data !== undefined) {
          this.pedidoCompleto.datos_pedido.push(data);
          this.CarritoAUX.push({ datosPedido: data, datosProducto: { imagen: informacionProducto[0]?.imagen, precio: informacionProducto[0]?.precio, nombre: informacionProducto[0]?.nombre,tipoAlimento:informacionProducto[0].tipoAlimento } })
          this.actualizarPrecio()
        }
      } else {
        var yaIncluido = false;
        var yaIncluidoAUX = false;

        this.CarritoAUX.forEach(d => {
          if (d?.datosPedido.id_alimento === data?.id_alimento) {
            const mismoExtra = d.datosPedido.extras.length === data.extras.length && d.datosPedido.extras.every((extra1) => {
              return data.extras.some((extra2) => {
                return extra1.nombre === extra2.nombre && extra1.precio === extra2.precio;
              });
            });

            if (mismoExtra && d?.datosPedido.id_alimento == data.id_alimento) {
              yaIncluidoAUX = true;
            }
          }
        })

        if (yaIncluidoAUX == false) {
          this.CarritoAUX.push({ datosPedido: data, datosProducto: { imagen: informacionProducto[0].imagen, precio: informacionProducto[0].precio, nombre: informacionProducto[0].nombre,tipoAlimento:informacionProducto[0].tipoAlimento } })
        }

        this.pedidoCompleto.datos_pedido.forEach(p => {
          if (p?.id_alimento === data?.id_alimento) {
            const mismoExtra = p.extras.length === data.extras.length && p.extras.every((extra1) => {
              return data.extras.some((extra2) => {
                return extra1.nombre === extra2.nombre && extra1.precio === extra2.precio;
              });
            });
            if (mismoExtra && p.id_alimento == data.id_alimento) {
              p.cantidad++
              yaIncluido = true;
              this.actualizarPrecio()
            }
          }
        })
      }
      if (yaIncluido == false) {
        this.pedidoCompleto.datos_pedido.push(data);
        this.actualizarPrecio()
      }
      this.contadorCarrito();
      this.pedidoService.cantidadProducto.emit(this.productos);
    }
    )


    this.pedidoService.disparadorStep1.subscribe(data => {
      this.pedidoCompleto.recogida_envio = data
    })

    /**
     * VER CUANDO NOS SALTAMOS LA INGRESA HAMBURGUESA, INGRESAS UNA BEBIDA Y LUEGO UNA HAMBURGUESA SALTA ERROR 
    */

    this.pedidoService.disparadorStep3.subscribe(data => {
      let dato = {...data}
      let informacionProducto = this.arrAlimento.filter((producto) => producto._id === dato.id_alimento);        
      if (this.pedidoCompleto.datos_pedido?.length == 0) {            
        this.pedidoCompleto.datos_pedido.push(dato);
        this.CarritoAUX.push({ datosPedido: dato, datosProducto: { imagen: informacionProducto[0].imagen, precio: informacionProducto[0].precio, nombre: informacionProducto[0].nombre,tipoAlimento:informacionProducto[0].tipoAlimento } })
        this.productos += dato.cantidad;
        this.precio = informacionProducto[0].precio as number * dato.cantidad;
      } else {
        var yaIncluido = false;
        var yaIncluidoAUX = false;
  
        this.CarritoAUX.forEach(producto => {
          if (producto?.datosPedido.id_alimento === dato?.id_alimento) {
            producto.datosPedido = dato;
            yaIncluidoAUX = true;
          }
          if (producto?.datosPedido.cantidad === 0) {
            this.CarritoAUX = this.CarritoAUX.filter(e => e.datosPedido.id_alimento !== dato.id_alimento);
          }
        })
        
        if (yaIncluidoAUX == false) {
          this.CarritoAUX.push({ datosPedido: dato, datosProducto: { imagen: informacionProducto[0].imagen, precio: informacionProducto[0].precio, nombre: informacionProducto[0].nombre,tipoAlimento:informacionProducto[0].tipoAlimento } }) 
        }
        
        this.pedidoCompleto.datos_pedido.forEach(p => {
          if (p.id_alimento === dato.id_alimento) {
            p.id_alimento = dato.id_alimento
            p.cantidad = dato.cantidad
            yaIncluido = true;
          }
          if (p.cantidad === 0) {
            this.pedidoCompleto = this.pedidoCompleto.datos_pedido.filter(p => p.id_alimento !== dato.id_alimento);
          }
        })
        this.actualizarPrecio()
      }
      if (yaIncluido == false) {
        this.pedidoCompleto.datos_pedido.push(dato);
        this.actualizarPrecio()
      }
      this.contadorCarrito();
      this.pedidoService.cantidadProducto.emit(this.productos);    })
  }

  actualizarPrecio(){
    this.precio = 0;
    this.pedidoCompleto.datos_pedido.forEach(producto => {
      this.arrAlimento.forEach(alimento =>{
        if (producto.id_alimento === alimento._id) {
          this.precio += alimento.precio as number * producto.cantidad as number; 
          if (producto?.extras) {
            producto.extras.forEach(e => {
              this.precio += e.precio as number;
            });
          }
        }

      })
    })
  }

  contadorCarrito(){
    let cantidades = 0;
    this.CarritoAUX.forEach(producto=>{
      cantidades += producto.datosPedido.cantidad;
    })
    this.productos = cantidades;
  }


  nextStep(producto: string) {
    if (this.pedidoCompleto.datos_pedido.length === 0) {
      this.omitirPaso('200ms', '200ms', producto)
    } else {
      this.alergenosAux.forEach(elemento =>elemento.estado= false)
      this.stepper.selected.editable = true;
      this.stepper.selected.completed = true;
      this.stepper.next()
    }
  }
  omitirPaso(enterAnimationDuration: string, exitAnimationDuration: string, tipoAlimento: string): void {
    
    this.dialogRefOmitir = this.dialog.open(DialogOmitirPasoComponent, {
      width: 'auto',
      enterAnimationDuration,
      exitAnimationDuration,
      data: tipoAlimento,
      autoFocus: false
    })
    this.dialogRefOmitir.afterClosed().subscribe(result => {
      if (result) {
        this.stepper.selected.completed = true;
        this.stepper.selected.editable = true;
        this.alergenosAux.forEach(elemento =>elemento.estado= false)
        this.stepper.next()
      }
    });
  }

  ordenarPedido() {
    this.pedidoService.setPedido(this.CarritoAUX)
    this.pedidoService.pedidoPendiente(this.pedidoCompleto)
  }

  modificarValorProducto(objeto: any, valorNuevo: number) {
    let informacionProducto = this.arrAlimento.filter((producto) => producto._id === objeto.id_alimento);

    this.CarritoAUX.forEach((producto) => {
      if (producto.datosPedido === objeto) {
        if (valorNuevo > producto.datosPedido.cantidad) {
          this.productos++;
          this.pedidoService.cantidadProducto.emit(this.productos);
          this.precio += informacionProducto[0].precio as number;
          if (objeto?.extras.length > 0) {
            objeto.extras.forEach(e => {
              this.precio += e.precio as number;
            });
          }
        } else {
          this.precio -= informacionProducto[0].precio as number;
          if (objeto.extras?.length > 0) {
            objeto.extras.forEach(e => {
              this.precio -= e.precio as number;
            });
          }
          this.productos--;
          this.pedidoService.cantidadProducto.emit(this.productos);
        }
        producto.datosPedido.cantidad = valorNuevo;
      }
    })

    this.pedidoCompleto.datos_pedido.forEach((producto) => {
      if (producto === objeto) {
        producto.cantidad = valorNuevo;
      }
    })
  }

  eliminarProductoCarrito(objeto: any) {  
    this.CarritoAUX.forEach((producto) => {
      if (producto.datosPedido === objeto.datosPedido) {
        this.productos = this.productos - objeto.datosPedido.cantidad;
        this.precio -=  objeto.datosPedido.cantidad * objeto.datosProducto.precio;
        if (objeto.datosPedido?.extras?.length > 0) {
          objeto.datosPedido.extras.forEach(x => {
            this.precio -=  x.precio;
          });
        }
      }
    })
    this.CarritoAUX = this.CarritoAUX.filter(producto => producto.datosPedido !== objeto.datosPedido);
    this.pedidoCompleto.datos_pedido = this.pedidoCompleto.datos_pedido.filter(producto => producto != objeto.datosPedido);
    if (this.CarritoAUX.length == 0) {
      this.pedidoCompleto.datos_pedido = [];
      this.precio = 0;
      this.productos = 0;
    }
    this.pedidoService.cantidadBebida.emit(objeto.datosPedido.id_alimento);
    this.pedidoService.cantidadProducto.emit(this.productos);
  }




  onStepChanged(event) {
    const currentIndex = event.selectedIndex;

     if (currentIndex == 1) {
      this.step2.rellenarHamburguesas()
    }else if (currentIndex == 3){
      this.step4.rellenarPostres()
    }
 }
}


