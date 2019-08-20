import { TestBed } from '@angular/core/testing';

import { GetLeaguesService } from './get-leagues.service';

describe('GetLeaguesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetLeaguesService = TestBed.get(GetLeaguesService);
    expect(service).toBeTruthy();
  });
});
