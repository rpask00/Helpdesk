import { TestBed } from '@angular/core/testing';

import { IsloggedoutGuard } from './isloggedout.guard';

describe('IsloggedoutGuard', () => {
  let guard: IsloggedoutGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsloggedoutGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
