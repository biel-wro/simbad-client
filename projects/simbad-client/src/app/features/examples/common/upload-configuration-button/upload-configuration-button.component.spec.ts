import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadConfigurationButtonComponent } from './upload-configuration-button.component';

describe('UploadConfigurationButtonComponent', () => {
  let component: UploadConfigurationButtonComponent;
  let fixture: ComponentFixture<UploadConfigurationButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadConfigurationButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadConfigurationButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
