import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusTileComponent } from './status-tile.component';

describe('StatusTileComponent', () => {
    let component: StatusTileComponent;
    let fixture: ComponentFixture<StatusTileComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StatusTileComponent]
        })
            .compileComponents();
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
