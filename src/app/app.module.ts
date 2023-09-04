import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatTooltipModule} from '@angular/material/tooltip';
import {HttpClientModule} from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import {MatStepperModule} from '@angular/material/stepper';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';
import { NgxNumberSpinnerModule } from 'ngx-number-spinner';
import {MatCheckboxModule} from '@angular/material/checkbox';



import { FooterComponent } from './layout/footer/footer.component';
import { SkeletonComponent } from './layout/skeleton/skeleton.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { HomeBurgerComponent } from './pages/home-burger/home-burger.component';
import { BannerHomeComponent } from './components/banner-home/banner-home.component';
import { SobreNosotrosComponent } from './components/sobre-nosotros/sobre-nosotros.component';
import { CarneRecomendacionComponent } from './components/carne-recomendacion/carne-recomendacion.component';
import { ContactoHomeComponent } from './components/contacto-home/contacto-home.component';
import { DashboardAdminComponent } from './pages/dashboard-admin/dashboard-admin.component';
import { LoginAdminComponent } from './pages/login-admin/login-admin.component';
import { SeleccionTipoProductosAdminComponent } from './pages/seleccion-tipo-productos-admin/seleccion-tipo-productos-admin.component';
import { ListaHamburguesasAdminComponent } from './pages/lista-hamburguesas-admin/lista-hamburguesas-admin.component';
import { ListaBebidasAdminComponent } from './pages/lista-bebidas-admin/lista-bebidas-admin.component';
import { ListaPostresAdminComponent } from './pages/lista-postres-admin/lista-postres-admin.component';
import { PedidosComponent } from './pages/pedidos-admin/pedidos.component';
import { DialogHamburguesaComponent } from './components/dialogsAlimentos/dialog-hamburguesa/dialog-hamburguesa.component';
import { ToastrModule } from 'ngx-toastr';
import {MatDividerModule} from '@angular/material/divider';
import { DialogBebidaComponent } from './components/dialogsAlimentos/dialog-bebida/dialog-bebida.component';
import { DialogBorrarAlimentoComponent } from './components/dialogsAlimentos/dialog-borrar-alimento/dialog-borrar-alimento.component';
import { DialogPostreComponent } from './components/dialogsAlimentos/dialog-postre/dialog-postre.component';
import { DialogActualizarProductoComponent } from './components/dialogsAlimentos/dialog-actualizar-producto/dialog-actualizar-producto.component';
import { DialogActualizarBebidaComponent } from './components/dialogsAlimentos/dialog-actualizar-bebida/dialog-actualizar-bebida.component';
import { ProcesoPedidoComponent } from './pages/proceso-pedido/proceso-pedido.component';
import { Step1Component } from './components/step1/step1.component';
import { Step2Component } from './components/step2/step2.component';
import { DialogOmitirPasoComponent } from './components/dialog-omitir-paso/dialog-omitir-paso.component';
import { DialogPedirProductoComponent } from './components/dialogsAlimentos/dialog-pedir-producto/dialog-pedir-producto.component';
import { Step3Component } from './components/step3/step3.component';
import { Step4Component } from './components/step4/step4.component';
import { StepPagoComponent } from './pages/step-pago/step-pago.component';
import { arrAlergenos } from './globalVariable/alergenos';
import { SpinnerModule } from './components/spinner/spinner.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpinnerInterceptor } from './interceptors/spinner.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    SkeletonComponent,
    NavigationComponent,
    HomeBurgerComponent,
    BannerHomeComponent,
    SobreNosotrosComponent,
    CarneRecomendacionComponent,
    ContactoHomeComponent,
    DashboardAdminComponent,
    LoginAdminComponent,
    SeleccionTipoProductosAdminComponent,
    ListaHamburguesasAdminComponent,
    ListaBebidasAdminComponent,
    ListaPostresAdminComponent,
    PedidosComponent,
    DialogHamburguesaComponent,
    DialogBebidaComponent,
    DialogBorrarAlimentoComponent,
    DialogPostreComponent,
    DialogActualizarProductoComponent,
    DialogActualizarBebidaComponent,
    ProcesoPedidoComponent,
    Step1Component,
    Step2Component,
    DialogOmitirPasoComponent,
    DialogPedirProductoComponent,
    Step3Component,
    Step4Component,
    StepPagoComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatTooltipModule,
    HttpClientModule,
    MatDialogModule,
    MatDividerModule,
    MatStepperModule,
    ToastrModule.forRoot(),
    MatBadgeModule,
    MatSidenavModule,
    MatExpansionModule,
    NgxNumberSpinnerModule,
    MatCheckboxModule,
    SpinnerModule

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: 'ALERGENOS', useValue: arrAlergenos }  ,
    { provide: HTTP_INTERCEPTORS, useClass :SpinnerInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
