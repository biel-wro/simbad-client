import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskContextComponent } from './task-context.component';
import { MatDividerModule } from '@angular/material';
import { MockComponent } from 'ng-mocks';
import { InfoListComponent } from '@simbad-client/app/features/examples/simulation-pipeline/components/common/info-list/info-list.component';

describe('TaskContextComponent', () => {
    let component: TaskContextComponent;
    let fixture: ComponentFixture<TaskContextComponent>;

    beforeEach(async(() => {
        return TestBed.configureTestingModule({
            declarations: [TaskContextComponent, MockComponent(InfoListComponent)],
            imports: [MatDividerModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TaskContextComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
