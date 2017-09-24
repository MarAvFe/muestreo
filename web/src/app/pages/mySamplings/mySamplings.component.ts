import { Component, ViewContainerRef } from '@angular/core';
import { MySamplingsService } from './mySamplings.service';
import { LocalDataSource } from 'ng2-smart-table';
import { RenderBitComponent } from './customComponents/renderBit.component';
import { NgUploaderOptions } from 'ngx-uploader';
import { ToastsManager, Toast } from 'ng2-toastr';
import { SamplingName } from './objects/SamplingName';
import { SamplingId } from './objects/SamplingId';
import { SamplingDescIdSamp } from './objects/SamplingDescIdSamp';

@Component({
    selector: 'mySamplings',
    templateUrl: 'mySamplings.html',
    styleUrls: ['./smartTables.scss'],
})
export class MySamplingsComponent {
    data: any;
    heads: any;
    sampleInfo: any;
    query: string = '';
    sampName: SamplingName[];

    getNames(service: MySamplingsService): void {
        this.service.getSamplingName().then(sampName => {
            this.sampName = sampName;
            this.loadSamplingInfo(this.sampName[0].name);
        });
    }

    campostabladefi = {
        hideSubHeader: true,
        actions: {
            delete: false,
        },
        edit: {
            editButtonContent: '<i class="ion-edit"></i>',
            saveButtonContent: '<i class="ion-checkmark"></i>',
            cancelButtonContent: '<i class="ion-close"></i>',
            confirmSave: true,
        },
        columns: {
            n_definitive: {
                title: 'n',
                type: 'number',
            },
            error_definitive: {
                title: 'E',
                type: 'number',
            },
            p_definitive: {
                title: 'p',
                type: 'number',
                editable: false,
            },
            q_definitive: {
                title: 'q',
                type: 'number',
                editable: false,
            },
            z_definitive: {
                title: 'z',
                type: 'number',
                editable: false,
            },
        },
    };
    campostablapre = {
        hideSubHeader: true,
        actions: {
            delete: false,
        },
        edit: {
            editButtonContent: '<i class="ion-edit"></i>',
            saveButtonContent: '<i class="ion-checkmark"></i>',
            cancelButtonContent: '<i class="ion-close"></i>',
            confirmSave: true,
        },
        columns: {
            n_preliminar: {
                title: 'n',
                type: 'number',
            },
            p_preliminar: {
                title: 'p',
                type: 'number',
                editable: false,
            },
            q_preliminar: {
                title: 'q',
                type: 'number',
                editable: false,
            },
        },
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
            confirmDelete: true,
        },
        columns: {
            id: {
                title: 'ID',
                type: 'number',
            },
            firstName: {
                title: 'First Name',
                type: 'string',
            },
            lastName: {
                title: 'Last Name',
                type: 'string',
            },
            username: {
                title: 'Username',
                type: 'string',
            },
            email: {
                title: 'E-mail',
                type: 'string',
            },
            age: {
                title: 'Age',
                type: 'number',
            },
        },
    };

    sourceDefParam: LocalDataSource = new LocalDataSource();
    sourcePreParam: LocalDataSource = new LocalDataSource();

    constructor(public toastr: ToastsManager, vcr: ViewContainerRef, protected service: MySamplingsService) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
        this.getNames(this.service);
    }

loadSamplingInfo(sampName): void {
    // se cargan los parámetros preeliminares
  // let sampleInfo;
    this.service.getIdSampDescIdSampType(sampName).then( data => {
        this.sampleInfo = {
            pId_Sampling : data[0].idSampling,
            pDescription : data[0].description,
            pIdSamplingType : data[0].SamplingType_idSamplingType,
        };

        //se cargan parámetros preliminares
        this.service.getPreParam(this.sampleInfo).then((dataz) => {
            this.sourcePreParam.load(dataz);
        }).catch(err => console.debug('Error al cargar los datos preliminares.'));

        //se cargan parámetros definitivos
        this.service.getDefParam(this.sampleInfo).then((datax) => {
            this.sourceDefParam.load(datax);
        }).catch(err => console.debug('Error al cargar los datos definitivos.'));
    });

}

onEditConfirmDefParam(event): void {

    this.service.editDefParam(this.service.createComposeDef(this.sampleInfo, event.newData))
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


onEditConfirmPreParam(event): void {
      console.debug("uhiuhuihihihi"+JSON.stringify(this.sampleInfo));
      console.debug("ñañaña"+ JSON.stringify(event.newData) );
     this.service.editPreParam(this.service.createComposePre(this.sampleInfo, event.newData))
    .then(res => {
    if (res.error === 'none') {
    event.confirm.resolve();
}else {
this.toastr.error('Por favor, compruebe los parámetros.');
event.confirm.reject();
}
},
);
}




}
