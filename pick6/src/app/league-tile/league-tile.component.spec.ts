import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueTileComponent } from './league-tile.component';

describe('LeagueTileComponent', () => {
  let component: LeagueTileComponent;
  let fixture: ComponentFixture<LeagueTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeagueTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeagueTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
