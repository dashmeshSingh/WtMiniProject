import { TestBed } from '@angular/core/testing';

import { ViewleavesService } from './viewleaves.service';

describe('ViewleavesService', () => {
  let service: ViewleavesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewleavesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
