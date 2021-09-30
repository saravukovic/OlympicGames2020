import { TestBed } from '@angular/core/testing';

import { VodjaService } from './vodja.service';

describe('VodjaService', () => {
  let service: VodjaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VodjaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
