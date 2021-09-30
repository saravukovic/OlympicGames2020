import { TestBed } from '@angular/core/testing';

import { DelegatService } from './delegat.service';

describe('DelegatService', () => {
  let service: DelegatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DelegatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
