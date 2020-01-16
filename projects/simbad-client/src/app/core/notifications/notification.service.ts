import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    constructor(private readonly snackBar: MatSnackBar, private readonly zone: NgZone) {}

    default(message: string) {
        this.show(message, {
            panelClass: 'default-notification-overlay'
        });
    }

    info(message: string, duration = 2000) {
        this.show(message, {
            panelClass: 'info-notification-overlay',
            duration,
        });
    }

    success(message: string) {
        this.show(message, {
            panelClass: 'success-notification-overlay'
        }, 'OK');
    }

    warn(message: string) {
        this.show(message, {
            panelClass: 'warning-notification-overlay'
        }, 'OK');
    }

    error(message: string) {
        this.show(message, {
            panelClass: 'error-notification-overlay',
        }, 'OK');
    }

    private show(message: string, configuration: MatSnackBarConfig, action?) {
        // Need to open snackBar from Angular zone to prevent issues with its position per
        // https://stackoverflow.com/questions/50101912/snackbar-position-wrong-when-use-errorhandler-in-angular-5-and-material
        this.zone.run(() => this.snackBar.open(message, action, configuration));
    }
}
