import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPostresAdminComponent } from './lista-postres-admin.component';

describe('ListaPostresAdminComponent', () => {
  let component: ListaPostresAdminComponent;
  let fixture: ComponentFixture<ListaPostresAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaPostresAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaPostresAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
