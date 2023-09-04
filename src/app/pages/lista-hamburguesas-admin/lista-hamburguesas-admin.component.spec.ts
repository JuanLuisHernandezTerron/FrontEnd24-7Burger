import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaHamburguesasAdminComponent } from './lista-hamburguesas-admin.component';

describe('ListaHamburguesasAdminComponent', () => {
  let component: ListaHamburguesasAdminComponent;
  let fixture: ComponentFixture<ListaHamburguesasAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaHamburguesasAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaHamburguesasAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
