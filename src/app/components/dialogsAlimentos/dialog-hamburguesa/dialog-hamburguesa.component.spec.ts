import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogHamburguesaComponent } from './dialog-hamburguesa.component';

describe('DialogHamburguesaComponent', () => {
  let component: DialogHamburguesaComponent;
  let fixture: ComponentFixture<DialogHamburguesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogHamburguesaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogHamburguesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
