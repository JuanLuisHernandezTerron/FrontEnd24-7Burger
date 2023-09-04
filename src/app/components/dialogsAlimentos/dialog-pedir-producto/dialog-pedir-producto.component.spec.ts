import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPedirProductoComponent } from './dialog-pedir-producto.component';

describe('DialogPedirProductoComponent', () => {
  let component: DialogPedirProductoComponent;
  let fixture: ComponentFixture<DialogPedirProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPedirProductoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogPedirProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
