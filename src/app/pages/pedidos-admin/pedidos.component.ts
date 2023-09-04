import { Component, OnInit } from '@angular/core';
import { pedido } from 'src/app/models/pedido';
import { PedidoService } from 'src/app/services/pedidos/pedido.service';
import { Canvas, Columns, Img, Line, PdfMakeWrapper, Txt } from 'pdfmake-wrapper';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
PdfMakeWrapper.setFonts(pdfFonts);

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {
  constructor(private pedidoService: PedidoService) { }
  arrayPedido: pedido[];

  arrayPedidoEnEspera: pedido[];
  arrayPedidoEnProceso: pedido[];

  ngOnInit(): void {
    this.pedidoService.getPedidoAdmin$.subscribe(data => {
      this.arrayPedido = data;
      this.arrayPedidoEnProceso = this.arrayPedido.filter(x => x.estado_pedido === 'En proceso');
      this.arrayPedidoEnEspera = this.arrayPedido.filter(x => x.estado_pedido === 'En espera');
    })
  }

  async pdfConverter(datos: any) {
    if (datos.estado_pedido === 'En espera') {
      this.generadorPDF(datos);
      this.pedidoService.modificarEstadoPedido(datos).subscribe((x) => {
        this.pedidoService.pedidoPendiente(datos);
        this.arrayPedido.forEach(x=>{
          if (x._id === datos._id) {
            x.estado_pedido = 'En proceso'
            this.arrayPedidoEnProceso = this.arrayPedido.filter(x => x.estado_pedido === 'En proceso');
            this.arrayPedidoEnEspera = this.arrayPedido.filter(x => x.estado_pedido === 'En espera');
          }
        })
      })
    } 
  }
  
  finalizarPedido(datos:pedido){
    this.arrayPedidoEnProceso.forEach(x=>{
      if (x._id === datos._id) {
        x.estado_pedido = 'Finalizado';
        this.pedidoService.FinalizarPedido(datos).subscribe(()=>{
          this.arrayPedidoEnProceso = this.arrayPedido.filter(x => x.estado_pedido === 'En proceso');
        })
      }
    })
  }

  async generadorPDF(datos: any) {
    const pdf = new PdfMakeWrapper();
    let precio = 0;
    let horario = new Date;

    pdf.add(new Txt('24/7 Burger').bold().fontSize(25).alignment('center').end);
    pdf.add(await new Img('https://i.postimg.cc/CLPJqS5C/logoburger.png').width(150).margin([0, 10, 0, 10]).alignment('center').build());
    pdf.add(new Txt('C\ Ave del paraíso Nº69').fontSize(10).alignment('center').end);
    pdf.add(new Txt(`Fecha Pedido:  ${horario.toLocaleDateString()}`).fontSize(12).margin([40, 15, 0, 0]).alignment('left').end);
    pdf.add(new Txt(`Nº Pedido:  ${datos._id}`).fontSize(12).margin([40, 0, 0, 0]).alignment('left').end);
    pdf.add(new Txt(`Nombre Cliente:  ${datos.datos_cliente.nombre}`).fontSize(12).margin([40, 0, 0, 0]).alignment('left').end);
    pdf.add(new Txt(`Recogida | Envio:  ${datos.recogida_envio}`).fontSize(12).margin([40, 0, 0, 0]).alignment('left').end);
    pdf.add(new Columns([new Txt('Producto').alignment('left').end, new Txt('Cantidad').alignment('center').end, new Txt('Precio').alignment('center').end]).columnGap(30).margin([40, 10, 0, 0]).end);
    datos.datos_pedido.forEach(x => {
      pdf.add(new Columns([new Txt(x.id_alimento.nombre).end, new Txt(x.cantidad).alignment('center').end, new Txt(`${x.id_alimento.precio * x.cantidad} €`).alignment('center').end]).columnGap(30).margin([40, 15, 0, 0]).alignment('left').end);
      precio += x.id_alimento.precio * x.cantidad;
      if (x?.extras.length > 0) {
        pdf.add(new Columns([new Txt('Extras:').alignment('left').end]).fontSize(9).margin([40, 2, 0, 0]).end);
        x?.extras.forEach(extra => {
          pdf.add(new Columns([new Txt(extra.nombre).alignment('left').end, new Txt('1').alignment('center').end, new Txt(`${extra.precio * x.cantidad} €`).alignment('center').end]).fontSize(10).columnGap(30).margin([40, 2, 0, 0]).end);
          precio += extra.precio * x.cantidad;
        });
      }
    });
    pdf.add(new Txt(`Precio Total CON IVA:  ${precio} €`).fontSize(12).margin([40, 50, 0, 0]).alignment('left').end);
    pdf.add(new Txt(`!GRACIAS POR SU COMPRA¡`).fontSize(8).margin([40, 15, 0, 0]).alignment('center').end);
    pdf.add(new Txt(`24/7 BURGER | LAS MEJORES HAMBURGUESAS DE SEVILLA`).fontSize(8).margin([40, 10, 0, 0]).alignment('center').end);
    pdf.create().download(`Pedido ${datos._id}`);
  }
}
