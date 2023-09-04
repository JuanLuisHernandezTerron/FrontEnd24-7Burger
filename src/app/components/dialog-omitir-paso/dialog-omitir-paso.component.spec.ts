import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogOmitirPasoComponent } from './dialog-omitir-paso.component';

describe('DialogOmitirPasoComponent', () => {
  let component: DialogOmitirPasoComponent;
  let fixture: ComponentFixture<DialogOmitirPasoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogOmitirPasoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogOmitirPasoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
