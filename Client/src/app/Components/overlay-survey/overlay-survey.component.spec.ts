import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlaySurveyComponent } from './overlay-survey.component';

describe('OverlaySurveyComponent', () => {
  let component: OverlaySurveyComponent;
  let fixture: ComponentFixture<OverlaySurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverlaySurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverlaySurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
