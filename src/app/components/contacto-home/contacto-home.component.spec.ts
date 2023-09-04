import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactoHomeComponent } from './contacto-home.component';

describe('ContactoHomeComponent', () => {
  let component: ContactoHomeComponent;
  let fixture: ComponentFixture<ContactoHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactoHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactoHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
