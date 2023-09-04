import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarneRecomendacionComponent } from './carne-recomendacion.component';

describe('CarneRecomendacionComponent', () => {
  let component: CarneRecomendacionComponent;
  let fixture: ComponentFixture<CarneRecomendacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarneRecomendacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarneRecomendacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
