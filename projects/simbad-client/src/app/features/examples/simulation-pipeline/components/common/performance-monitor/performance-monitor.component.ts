import { Component, Input } from '@angular/core';
import { CliRuntimeInfo } from '@simbad-cli-api/gen/models/cli-runtime-info';

@Component({
    selector: 'simbad-performance-monitor',
    templateUrl: './performance-monitor.component.html',
    styleUrls: ['./performance-monitor.component.scss']
})
export class PerformanceMonitorComponent {
    @Input() runtimeInfo: CliRuntimeInfo;
    @Input() elapsedTime: string;
}
