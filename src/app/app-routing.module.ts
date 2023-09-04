import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SkeletonComponent } from './layout/skeleton/skeleton.component';
import { HomeBurgerComponent } from './pages/home-burger/home-burger.component';
import { LoginAdminComponent } from './pages/login-admin/login-admin.component';
import { DashboardAdminComponent } from './pages/dashboard-admin/dashboard-admin.component';
import { SeleccionTipoProductosAdminComponent } from './pages/seleccion-tipo-productos-admin/seleccion-tipo-productos-admin.component';
import { ListaHamburguesasAdminComponent } from './pages/lista-hamburguesas-admin/lista-hamburguesas-admin.component';
import { ListaBebidasAdminComponent } from './pages/lista-bebidas-admin/lista-bebidas-admin.component';
import { ListaPostresAdminComponent } from './pages/lista-postres-admin/lista-postres-admin.component';
import { PedidosComponent } from './pages/pedidos-admin/pedidos.component';
import { CheckLoginGuard } from './guards/checkLogin/check-login.guard';
import { CheckUserTiendaGuard } from './guards/checkUserTienda/check-user-tienda.guard';
import { ProcesoPedidoComponent } from './pages/proceso-pedido/proceso-pedido.component';
import { StepPagoComponent } from './pages/step-pago/step-pago.component';
import { CheckCarritoPayGuard } from './guards/checkCarrito/check-carrito-pay.guard';
const routes: Routes = [{
  path: '',
  component:SkeletonComponent,
  pathMatch:'prefix',
  children:[
    {path: '', component: HomeBurgerComponent},
    {path: 'pedido', component: ProcesoPedidoComponent},
    {path: 'pago', component: StepPagoComponent, canActivate:[CheckCarritoPayGuard]}
  ]
},
{
  path: 'admin',
  component:SkeletonComponent,
  pathMatch:'prefix',
  children:[
    {path: '', component: LoginAdminComponent}
  ],
  canActivate : [CheckLoginGuard]
  
},
{
  path: 'admin/dashboard',
  component:SkeletonComponent,
  canActivate: [CheckUserTiendaGuard],
  
  children:[
    {path: '', component: DashboardAdminComponent},
    {path: 'productos', component: SeleccionTipoProductosAdminComponent},
    {path: 'productos/hamburguesas', component: ListaHamburguesasAdminComponent},
    {path: 'productos/bebidas', component: ListaBebidasAdminComponent},
    {path: 'productos/postres', component: ListaPostresAdminComponent},
    {path: 'pedidos', component: PedidosComponent},
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
