import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepPagoComponent } from './step-pago.component';

describe('StepPagoComponent', () => {
  let component: StepPagoComponent;
  let fixture: ComponentFixture<StepPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepPagoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
