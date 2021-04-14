import { TestBed } from '@angular/core/testing';

import { MycamundamicroserviceService } from './mycamundamicroservice.service';

describe('MycamundamicroserviceService', () => {
  let service: MycamundamicroserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MycamundamicroserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
