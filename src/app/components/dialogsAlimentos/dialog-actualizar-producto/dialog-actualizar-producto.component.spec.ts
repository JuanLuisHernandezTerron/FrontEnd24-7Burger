import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogActualizarProductoComponent } from './dialog-actualizar-producto.component';

describe('DialogActualizarProductoComponent', () => {
  let component: DialogActualizarProductoComponent;
  let fixture: ComponentFixture<DialogActualizarProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogActualizarProductoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogActualizarProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
