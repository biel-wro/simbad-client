import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceMonitorComponent } from './performance-monitor.component';
import { MockComponent } from 'ng-mocks';
import { StatusTileComponent } from '@simbad-simulation/lib/simulation-pipeline/components/common/status-tile/status-tile.component';
import { MatDividerModule } from '@angular/material';

describe('PerformanceMonitorComponent', () => {
    let component: PerformanceMonitorComponent;
    let fixture: ComponentFixture<PerformanceMonitorComponent>;

    beforeEach(async(() => {
        return TestBed.configureTestingModule({
            declarations: [PerformanceMonitorComponent, MockComponent(StatusTileComponent)],
            imports: [MatDividerModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PerformanceMonitorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
