import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'simbad-small-input-action',
  templateUrl: './small-input-action.component.html',
  styleUrls: ['./small-input-action.component.scss']
})
export class SmallInputActionComponent {

    @Input()
    disabled = false;
    @Input()
    fontSet = '';
    @Input()
    fontIcon = '';
    @Input()
    faIcon = '';
    @Input()
    label = '';
    @Input()
    color = '';

    @Output()
    action = new EventEmitter<void>();

    hasFocus = false;

    onClick() {
        this.action.emit();
    }

}
