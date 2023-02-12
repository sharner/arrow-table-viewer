import { TestBed } from '@angular/core/testing';

import { HelloWorldService } from './arrow-action.service';

describe('HelloWorldService', () => {
  let service: HelloWorldService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HelloWorldService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
