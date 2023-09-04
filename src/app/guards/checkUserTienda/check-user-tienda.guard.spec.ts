import { TestBed } from '@angular/core/testing';

import { CheckUserTiendaGuard } from './check-user-tienda.guard';

describe('CheckUserTiendaGuard', () => {
  let guard: CheckUserTiendaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CheckUserTiendaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
