import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusTileComponent } from './status-tile.component';
import { SharedModule } from '@simbad-client/app/shared/shared.module';

describe('StatusTileComponent', () => {
    let component: StatusTileComponent;
    let fixture: ComponentFixture<StatusTileComponent>;

    beforeEach(async(() => {
        return TestBed.configureTestingModule({
            declarations: [StatusTileComponent],
            imports: [SharedModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StatusTileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
