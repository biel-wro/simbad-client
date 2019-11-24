import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CliStepComponent } from './cli-step.component';

describe('AnalyzerStepComponent', () => {
  let component: CliStepComponent;
  let fixture: ComponentFixture<CliStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CliStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CliStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
