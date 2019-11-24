import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyzerStepComponent } from './analyzer-step.component';

describe('AnalyzerStepComponent', () => {
  let component: AnalyzerStepComponent;
  let fixture: ComponentFixture<AnalyzerStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyzerStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyzerStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
