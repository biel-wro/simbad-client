import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ParameterTreeNode } from '../../../../../core/configuration-management/models';
import { FormControl, FormGroup } from '@angular/forms';
import { distinctUntilChanged, skip, take, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { selectNodeValue } from '@simbad-client/app/features/examples/configuration-editor/store/form.selectors';
import { NotificationService } from '@simbad-client/app/core/notifications/notification.service';

@Component({
    selector: 'simbad-simple-parameter',
    templateUrl: './simple-parameter.component.html',
    styleUrls: ['./simple-parameter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimpleParameterComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input()
    node: ParameterTreeNode;
    @Input()
    form: FormGroup;
    @Input()
    parentPath: string;
    @Input() test: string;

    control: FormControl;
    formControlValueInStore: Observable<any>;
    formControlValueUpdate: Subject<any> = new Subject();
    ngUnsubscribe: Subject<void> = new Subject();

    constructor( private store: Store<{}>, private notificationService: NotificationService) {}

    ngOnInit() {
        this.node.path = this.parentPath + `/${this.node.definition.className}`;


        this.formControlValueInStore = this.store.pipe(
            takeUntil(this.ngUnsubscribe),
            select(selectNodeValue(this.node.path)),
            distinctUntilChanged(),
        );
    }

    getDisplayName(className: string) {
        return className.startsWith('d_') ? className.slice(2) : className;
    }

    ngAfterViewInit(): void {
        this.control = this.form.get(this.node.path) as FormControl;
        this.control.valueChanges.pipe(skip(1), takeUntil(this.ngUnsubscribe)).subscribe(() => {
            this.notificationService.info(`Updated parameter ${this.node.definition.className}`, 2000);
        });
        this.formControlValueInStore.pipe(
            takeUntil(this.ngUnsubscribe),
            take(1)
        ).subscribe((value) => {
            if (value) {
               this.control.patchValue(value);
            }
        });
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

}
