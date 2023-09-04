import { TestBed } from '@angular/core/testing';

import { CheckCarritoPayGuard } from './check-carrito-pay.guard';

describe('CheckCarritoPayGuard', () => {
  let guard: CheckCarritoPayGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CheckCarritoPayGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
