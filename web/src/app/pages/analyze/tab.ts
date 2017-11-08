import { Component, Input } from '@angular/core';

@Component({
    selector: 'tab',
    template: `
        <p [hidden]="!show">
            <ng-content></ng-content>
        </p>
    `
})
export class TabComponent {
    @Input()
    tabTitle: string;

    show: boolean = true;
}
