import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesoPedidoComponent } from './proceso-pedido.component';

describe('ProcesoPedidoComponent', () => {
  let component: ProcesoPedidoComponent;
  let fixture: ComponentFixture<ProcesoPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcesoPedidoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcesoPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
