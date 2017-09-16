import { Component, Input, OnInit } from '@angular/core';

import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
    {{renderValue}}
  `,
})
export class RenderBitComponent implements ViewCell, OnInit {

  renderValue: string;

  @Input() value: any;
  @Input() rowData: any;

  ngOnInit() {
      if (typeof this.value === 'string') {
          this.renderValue = this.value === '1' ? 'Si' : 'No';
      }else if (this.value.data) {
          this.renderValue = this.value.data[0] === 0 ? 'No' : 'Si';
      }else {
          const errStr = 'RenderBitComponent could not render: ';
          const errType = ', with type: ';
          console.error(errStr + this.value + errType + typeof this.value);
          this.renderValue = '-';
      }
  }

}
