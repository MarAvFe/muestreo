import { Component, ViewContainerRef } from '@angular/core';
import { MySamplingsService } from './mySamplings.service';
import { LocalDataSource } from 'ng2-smart-table';
import { RenderBitComponent } from './customComponents/renderBit.component';
import { NgUploaderOptions } from 'ngx-uploader';
import { ToastsManager, Toast } from 'ng2-toastr';

@Component({
  selector: 'mySamplings',
  templateUrl: 'mySamplings.html',
  styleUrls: ['./smartTables.scss'],
})
export class MySamplingsComponent {
    data: any;
    sampleInfo = { 'pId_Sampling': '1',
    'pDescription': 'muestrear la construcción Escuela Mante',
     'pIdSamplingType': '1' };
    query: string = '';

    campostabladefi = {
    add: {
        addButtonContent: '<i class="ion-ios-plus-outline"></i>',
        createButtonContent: '<i class="ion-checkmark"></i>',
        cancelButtonContent: '<i class="ion-close"></i>',
        confirmCreate: true,
    },
    edit: {
        editButtonContent: '<i class="ion-edit"></i>',
        saveButtonContent: '<i class="ion-checkmark"></i>',
        cancelButtonContent: '<i class="ion-close"></i>',
        confirmSave: true,
    },
    delete: {
        deleteButtonContent: '<i class="ion-trash-a"></i>',
        confirmDelete: true,
    },
      columns: {
        n1: {
          title: 'n',
          type: 'number'
        },
        e1: {
          title: 'E',
          type: 'number'
        },
        p1: {
          title: 'p',
          type: 'number'
        },
        q1: {
          title: 'q',
          type: 'number'
        },
        z1: {
          title: 'z',
          type: 'number'
        }
      }
    };
    campostablapre = {
    edit: {
        editButtonContent: '<i class="ion-edit"></i>',
        saveButtonContent: '<i class="ion-checkmark"></i>',
        cancelButtonContent: '<i class="ion-close"></i>',
        confirmSave: true,
    },
      columns: {
        n_preliminar: {
          title: 'n',
          type: 'number'
        },
        error_preliminar: {
          title: 'E',
          type: 'number'
        },
        p_preliminar: {
          title: 'p',
          type: 'number'
        },
        q_preliminar: {
          title: 'q',
          type: 'number'
        },
         z_preliminar: {
            title: 'z',
            type: 'number'
          }
      }
    };
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

    constructor(public toastr: ToastsManager, vcr: ViewContainerRef, protected service: MySamplingsService) {
      this.toastr.setRootViewContainerRef(vcr);
      this.service.getPreParam(this.sampleInfo).then((data) => {
          this.source.load(data);

      });
    }

    onEditConfirmPreParam(event): void {
      console.log("hola" + JSON.stringify(this.sampleInfo));
      console.log("new Data" +  JSON.stringify(event.newData));
      console.log("funcion" +JSON.stringify(this.service.createCompose(this.sampleInfo,  event.newData)));
        this.service.editPreParam(this.service.createCompose(this.sampleInfo,  event.newData))
        .then(res => {
             if (res.error === 'none') {
                 event.confirm.resolve();
             }else {
                 this.toastr.error('Por favor, compruebe los parámetros.');
                 console.debug(JSON.stringify(res));
                 event.confirm.reject();
             }
         },
        );
    }


}
