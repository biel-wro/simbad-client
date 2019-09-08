import { Component, Input, OnInit } from '@angular/core';
import { ListElement } from '@simbad-client/app/features/examples/simulation-pipeline/cli-step/components/info-list/info-list.component';

@Component({
    selector: 'simbad-client-info-list-element',
    templateUrl: './info-list-element.component.html',
    styleUrls: ['./info-list-element.component.scss']
})
export class InfoListElementComponent implements OnInit {
    @Input() data: ListElement;

    constructor() {
    }

    ngOnInit() {
    }

}
