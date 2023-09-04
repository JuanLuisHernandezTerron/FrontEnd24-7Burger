import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionTipoProductosAdminComponent } from './seleccion-tipo-productos-admin.component';

describe('SeleccionTipoProductosAdminComponent', () => {
  let component: SeleccionTipoProductosAdminComponent;
  let fixture: ComponentFixture<SeleccionTipoProductosAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeleccionTipoProductosAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeleccionTipoProductosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
