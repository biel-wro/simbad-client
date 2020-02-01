import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleParameterComponent } from './simple-parameter.component';
import { SharedModule } from '@simbad-client/app/shared/shared.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';
import { NotificationService } from '@simbad-client/app/core/notifications/notification.service';

describe('SimpleParameterComponent', () => {
    let component: SimpleParameterComponent;
    let fixture: ComponentFixture<SimpleParameterComponent>;

    beforeEach(async(() => {
        return TestBed.configureTestingModule({
            imports: [SharedModule, NoopAnimationsModule, TranslateModule.forRoot()],
            declarations: [SimpleParameterComponent],
            providers: [
                FormBuilder,
                provideMockStore({
                    initialState: {}
                }),
                {
                    provide: NotificationService,
                    useValue: {
                        info: () => {}
                    }
                }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SimpleParameterComponent);
        component = fixture.componentInstance;
        component.node = {
            definition: {
                className: 'start_size',
                isRoot: false,
                description: 'description',
                type: 'simple'
            },
            path: 'stream',
            simpleChildren: [],
            complexChildren: []
        };
        component.parentPath = 'some_parameter';
        const fb = TestBed.get(FormBuilder) as FormBuilder;
        component.form = fb.group({
            'some_parameter/start_size': new FormControl()
        });
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
