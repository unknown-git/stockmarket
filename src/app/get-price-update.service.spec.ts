import { TestBed } from '@angular/core/testing';

import { GetPriceUpdateService } from './get-price-update.service';

describe('GetPriceUpdateService', () => {
  let service: GetPriceUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetPriceUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
