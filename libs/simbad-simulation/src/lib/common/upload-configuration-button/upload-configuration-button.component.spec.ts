import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadConfigurationButtonComponent } from './upload-configuration-button.component';
import { SharedModule } from '@simbad-client/app/shared/shared.module';
import { provideMockStore } from '@ngrx/store/testing';
import { MatSnackBarModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

describe('UploadConfigurationButtonComponent', () => {
    let component: UploadConfigurationButtonComponent;
    let fixture: ComponentFixture<UploadConfigurationButtonComponent>;

    beforeEach(async(() => {
        return TestBed.configureTestingModule({
            declarations: [UploadConfigurationButtonComponent],
            imports: [SharedModule, MatSnackBarModule, TranslateModule.forRoot()],
            providers: [provideMockStore({ initialState: {} })]
        }).compileComponents();
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
