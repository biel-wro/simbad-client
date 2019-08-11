import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';

import { NotificationService } from '../../../../core/core.module';
import { SharedModule } from '../../../../shared/shared.module';

import { NotificationsComponent } from './notifications.component';
import { MatSnackBarModule } from '@angular/material';

describe('NotificationsComponent', () => {
    let component: NotificationsComponent;
    let fixture: ComponentFixture<NotificationsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SharedModule, NoopAnimationsModule, TranslateModule.forRoot(), MatSnackBarModule],
            providers: [NotificationService],
            declarations: [NotificationsComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NotificationsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
