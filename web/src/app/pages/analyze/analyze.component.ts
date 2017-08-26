import { Component } from '@angular/core';

import { AnalyzeService } from './analyze.service';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
    selector: 'analyze',
    templateUrl: './analyze.html',
})
export class AnalyzeComponent {

    data:any;

    query: string = '';

    settings = {
      add: {
        addButtonContent: '<i class="ion-ios-plus-outline"></i>',
        createButtonContent: '<i class="ion-checkmark"></i>',
        cancelButtonContent: '<i class="ion-close"></i>',
      },
      edit: {
        editButtonContent: '<i class="ion-edit"></i>',
        saveButtonContent: '<i class="ion-checkmark"></i>',
        cancelButtonContent: '<i class="ion-close"></i>',
      },
      delete: {
        deleteButtonContent: '<i class="ion-trash-a"></i>',
        confirmDelete: true
      },
      columns: {
        id: {
          title: 'ID',
          type: 'number'
        },
        firstName: {
          title: 'First Name',
          type: 'string'
        },
        lastName: {
          title: 'Last Name',
          type: 'string'
        },
        username: {
          title: 'Username',
          type: 'string'
        },
        email: {
          title: 'E-mail',
          type: 'string'
        },
        age: {
          title: 'Age',
          type: 'number'
        }
      }
    };

    source: LocalDataSource = new LocalDataSource();

    constructor(private _analyzeService: AnalyzeService) {
        this._analyzeService.getData().then((data) => {
          this.source.load(data);
        });
    }

    ngOnInit() {
      this.data = this._analyzeService.getAll();
    }

    getResponsive(padding, offset) {
      return this._analyzeService.getResponsive(padding, offset);
    }

    onDeleteConfirm(event): void {
      if (window.confirm('Are you sure you want to delete?')) {
        event.confirm.resolve();
      } else {
        event.confirm.reject();
      }
    }
}
