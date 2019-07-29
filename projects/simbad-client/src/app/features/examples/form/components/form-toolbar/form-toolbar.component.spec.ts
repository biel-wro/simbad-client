import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormToolbarComponent } from './form-toolbar.component';
import { SharedModule } from '../../../../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

describe('FormToolbarComponent', () => {
    let component: FormToolbarComponent;
    let fixture: ComponentFixture<FormToolbarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SharedModule, TranslateModule.forRoot()],
            declarations: [FormToolbarComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormToolbarComponent);
        component = fixture.componentInstance;
        component.configurationModel$ = of({});
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
