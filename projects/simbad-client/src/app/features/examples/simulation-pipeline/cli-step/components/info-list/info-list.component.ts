import { Component, Input, OnInit } from '@angular/core';

export interface ListElement {
    key: string,
    value: string,
    preview?: () => any,
    download?: () => any,
    show?: () => any
}

@Component({
    selector: 'simbad-client-info-list',
    templateUrl: './info-list.component.html',
    styleUrls: ['./info-list.component.scss']
})
export class InfoListComponent implements OnInit {
    @Input() data: ListElement[];

    constructor() {
    }

    ngOnInit() {
        this.data = [
            {
                key: 'Configuration File',
                value: 'parametric_evolution_3d.json',
                show: () => console.log('parametric_evolution_3d.json'),
                download: () => console.log('parametric_evolution_3d.json'),
                preview: () => console.log('parametric_evolution_3d.json')
            },
            { key: 'Start Timestamp', value: new Date().toISOString() },
            { key: 'Stop Criterion', value: 'Population size' },
            { key: 'Status', value: 'Running...' },
            { key: 'Configuration File', value: 'show' },
            { key: 'Stop Criterion', value: 'Population size' },
            { key: 'Status', value: 'Running...' }
        ];

    }

}
