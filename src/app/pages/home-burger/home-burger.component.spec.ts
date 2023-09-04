import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBurgerComponent } from './home-burger.component';

describe('HomeBurgerComponent', () => {
  let component: HomeBurgerComponent;
  let fixture: ComponentFixture<HomeBurgerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeBurgerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeBurgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
