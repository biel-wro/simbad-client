import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportStepComponent } from './report-step.component';

describe('ReportStepComponent', () => {
  let component: ReportStepComponent;
  let fixture: ComponentFixture<ReportStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});