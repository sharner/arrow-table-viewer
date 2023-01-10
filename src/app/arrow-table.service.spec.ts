import { TestBed } from '@angular/core/testing';

import { ArrowTableService } from './arrow-table.service';

describe('ArrowTableService', () => {
  let service: ArrowTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArrowTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
