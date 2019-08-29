import { TestBed } from '@angular/core/testing';

import { GetSchoolsService } from './get-schools.service';

describe('GetSchoolsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetSchoolsService = TestBed.get(GetSchoolsService);
    expect(service).toBeTruthy();
  });
});
