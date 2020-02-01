import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollToTopButtonComponent } from './scroll-to-top-button.component';
import { SharedModule } from '@simbad-client/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

describe('ScrollToTopButtonComponent', () => {
    let component: ScrollToTopButtonComponent;
    let fixture: ComponentFixture<ScrollToTopButtonComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ScrollToTopButtonComponent],
            imports: [SharedModule, TranslateModule.forRoot()]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ScrollToTopButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
