import { TestBed } from '@angular/core/testing';

import { LeaguePageService } from './league-page.service';

describe('LeaguePageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LeaguePageService = TestBed.get(LeaguePageService);
    expect(service).toBeTruthy();
  });
});
