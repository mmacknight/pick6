import { TestBed } from '@angular/core/testing';

import { AddTeamService } from './add-team.service';

describe('AddTeamService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddTeamService = TestBed.get(AddTeamService);
    expect(service).toBeTruthy();
  });
});
