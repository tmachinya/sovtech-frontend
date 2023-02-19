import { TestBed } from '@angular/core/testing';

import { MockPeopleService } from './mock-people.service';

describe('MockPeopleService', () => {
  let service: MockPeopleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockPeopleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
