import { TestBed } from '@angular/core/testing';

import { GeocodeLocationService } from './geocode-location.service';

describe('GeocodeLocationService', () => {
  let service: GeocodeLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeocodeLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
