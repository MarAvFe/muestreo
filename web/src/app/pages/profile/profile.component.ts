import { Component } from '@angular/core';
import { ProfileService } from './profile.service';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'profile',
  templateUrl: 'profile.html',
})
export class ProfileComponent {
    data:any;

    query: string = '';

    settings = {
        add: {
          addButtonContent: '<i hidden="" class="ion-ios-plus-outline"></i>',
          createButtonContent: '<i class="ion-checkmark"></i>',
          cancelButtonContent: '<i class="ion-close"></i>',
        },
        edit: {
          editButtonContent: '<i hidden="" class="ion-edit"></i>',
          saveButtonContent: '<i class="ion-checkmark"></i>',
          cancelButtonContent: '<i class="ion-close"></i>',
        },
        delete: {
        deleteButtonContent: '<i class="ion-android-person-add"></i>',
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

    constructor(private _profileService: ProfileService) {
    }

    ngOnInit() {
      this.data = this._profileService.getAll();
    }

    getResponsive(padding, offset) {
      return this._profileService.getResponsive(padding, offset);
    }

    onDeleteConfirm(event): void {
      if (window.confirm('Desea agregar a esta persona como colaborador?')) {
        event.confirm.resolve();
      } else {
        event.confirm.reject();
      }
    }
}
