import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBorrarAlimentoComponent } from './dialog-borrar-alimento.component';

describe('DialogBorrarAlimentoComponent', () => {
  let component: DialogBorrarAlimentoComponent;
  let fixture: ComponentFixture<DialogBorrarAlimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogBorrarAlimentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogBorrarAlimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
