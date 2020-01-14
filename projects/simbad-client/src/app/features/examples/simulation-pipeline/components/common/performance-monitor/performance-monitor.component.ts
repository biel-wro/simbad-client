import { Component, Input } from '@angular/core';
import { CliRuntimeInfo } from '@simbad-cli-api/gen/models/cli-runtime-info';
import { formatBytes } from '@simbad-client/app/features/examples/simulation-pipeline/core/functions/size-format-utils';

interface MemoryInfo {
    value: string;
    title: string;
}

@Component({
    selector: 'simbad-performance-monitor',
    templateUrl: './performance-monitor.component.html',
    styleUrls: ['./performance-monitor.component.scss']
})
export class PerformanceMonitorComponent {
    @Input() runtimeInfo: CliRuntimeInfo;
    @Input() elapsedTime: string;

    formatRam(bytes: number): MemoryInfo {
        const formatted = formatBytes(bytes);
        const [value, unit] = formatted.split(' ');
        return {
            value,
            title: `Ram usage [${unit}]`
        };
    }
}
