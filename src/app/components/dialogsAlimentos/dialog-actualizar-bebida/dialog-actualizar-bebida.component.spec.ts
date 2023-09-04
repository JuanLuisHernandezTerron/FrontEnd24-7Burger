import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogActualizarBebidaComponent } from './dialog-actualizar-bebida.component';

describe('DialogActualizarBebidaComponent', () => {
  let component: DialogActualizarBebidaComponent;
  let fixture: ComponentFixture<DialogActualizarBebidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogActualizarBebidaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogActualizarBebidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
