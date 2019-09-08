import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulationPipelineComponent } from './simulation-pipeline.component';

describe('SimulationPipelineComponent', () => {
  let component: SimulationPipelineComponent;
  let fixture: ComponentFixture<SimulationPipelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimulationPipelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulationPipelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
