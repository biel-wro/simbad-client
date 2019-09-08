import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallInputActionComponent } from './small-input-action.component';

describe('SmallInputActionComponent', () => {
  let component: SmallInputActionComponent;
  let fixture: ComponentFixture<SmallInputActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmallInputActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallInputActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
