import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'simbad-status-tile',
    templateUrl: './status-tile.component.html',
    styleUrls: ['./status-tile.component.scss']
})
export class StatusTileComponent implements OnInit {
    @Input() value: string;
    @Input() title: string;
    @Input() faIcon = '-';
    @Input() rotate = false;

    constructor() {
    }

    ngOnInit() {
    }

}
