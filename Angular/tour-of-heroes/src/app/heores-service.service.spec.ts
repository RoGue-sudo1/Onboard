import { TestBed } from '@angular/core/testing';

import { HeoresServiceService } from './heores-service.service';

describe('HeoresServiceService', () => {
  let service: HeoresServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeoresServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
