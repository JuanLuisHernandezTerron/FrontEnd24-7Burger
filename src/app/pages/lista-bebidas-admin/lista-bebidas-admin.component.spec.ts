import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaBebidasAdminComponent } from './lista-bebidas-admin.component';

describe('ListaBebidasAdminComponent', () => {
  let component: ListaBebidasAdminComponent;
  let fixture: ComponentFixture<ListaBebidasAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaBebidasAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaBebidasAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
