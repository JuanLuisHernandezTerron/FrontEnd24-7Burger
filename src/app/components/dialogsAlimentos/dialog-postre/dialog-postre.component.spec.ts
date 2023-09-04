import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPostreComponent } from './dialog-postre.component';

describe('DialogPostreComponent', () => {
  let component: DialogPostreComponent;
  let fixture: ComponentFixture<DialogPostreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPostreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogPostreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
