import { TestBed } from '@angular/core/testing';

import { UtilityJqueryService } from './utility-jquery.service';

describe('UtilityJqueryService', () => {
  let service: UtilityJqueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilityJqueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
