import { TestBed } from '@angular/core/testing';

import { OrganizatorService } from './organizator.service';

describe('OrganizatorService', () => {
  let service: OrganizatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrganizatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
