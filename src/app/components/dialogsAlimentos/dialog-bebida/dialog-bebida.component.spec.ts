import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBebidaComponent } from './dialog-bebida.component';

describe('DialogBebidaComponent', () => {
  let component: DialogBebidaComponent;
  let fixture: ComponentFixture<DialogBebidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogBebidaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogBebidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
