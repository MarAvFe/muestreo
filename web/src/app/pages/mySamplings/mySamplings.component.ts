import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { MySamplingsService } from './mySamplings.service';
import { LocalDataSource } from 'ng2-smart-table';
import { RenderBitComponent } from './customComponents/renderBit.component';
import { NgUploaderOptions } from 'ngx-uploader';
import { ToastsManager, Toast } from 'ng2-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { SamplingName } from './objects/SamplingName';
import { SamplingId } from './objects/SamplingId';
import { SamplingDescIdSamp } from './objects/SamplingDescIdSamp';
import { Colaborator } from './objects/Colaborator';

@Component({
    selector: 'mySamplings',
    templateUrl: 'mySamplings.html',
    styleUrls: ['./smartTables.scss'],
})
export class MySamplingsComponent implements OnInit {
    data: any;
    heads: any;
    sampleInfo: any;
    query: string = '';
    cedula: string = '';
    sampName: SamplingName[];
    colaborators: Colaborator[];

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
    settingsUsers = {
        actions: {
            edit: false,
            create: false,
        },
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
            cedula: {
                title: 'Identificación',
                type: 'string',
            },
            name: {
                title: 'Nombre',
                type: 'string',
            },
        },
    };

    sourceDefParam: LocalDataSource = new LocalDataSource();
    sourcePreParam: LocalDataSource = new LocalDataSource();
    sourceUsers: LocalDataSource = new LocalDataSource();

    constructor(private route: ActivatedRoute, private router: Router,
        public toastr: ToastsManager, vcr: ViewContainerRef, protected service: MySamplingsService) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    ngOnInit() {
        this.cedula = localStorage.getItem('cedula');
        if (this.cedula !== null) {
            this.service.getMySamplings(this.cedula)
            .then(data => {
                this.sampName = data;
                this.loadSamplingInfo(this.sampName[0].name);
            })
            .catch( this.handleError );
        } else {
            this.router.navigate(['/logout']);
        }
    }

    onDeleteConfirm(event) {
        console.debug(`eventData: ${JSON.stringify(event.data)}`);
        const choice = window.prompt(`Escriba 'admin' en el cuadro para asignar a ${event.data.name} como administrador.`);
        if (choice !== null) {
            let params;
            if (choice === 'admin') {
                console.debug('Adding as admin');
                params = {
                    pIdSampling: this.sampleInfo.pId_Sampling,
                    pCedulaUser: event.data.cedula,
                    pIsAdmin: 1,
                };
            } else {
                console.debug('Adding as notAdmin');
                params = {
                    pIdSampling: this.sampleInfo.pId_Sampling,
                    pCedulaUser: event.data.cedula,
                    pIsAdmin: 0,
                };
            }
            console.debug(`rcvPars: ${JSON.stringify(params)}`);
            this.service.assignColaborator(params)
            .then(res => {
                 if (res.error === 'none') {
                     event.confirm.resolve();
                 }else {
                     this.toastr.error('Por favor, compruebe los parámetros.');
                     console.debug(JSON.stringify(res));
                     event.confirm.reject();
                 }
             }).catch(this.handleError);
        } else {
            event.confirm.reject();
        }
    }

    unassignColaborator(cedula) {
        if (window.confirm(`Desea desasignar al usuario con la identificación ${cedula}.`)) {
            const params = {
                pIdSampling: this.sampleInfo.pId_Sampling,
                pCedulaUser: cedula,
            };
            this.service.unassignColaborator(params)
            .then(res => {
                 if (res.error === 'none') {
                     this.toastr.success('Desasignación exitosa.');
                 }else {
                     this.toastr.error('Por favor, compruebe los parámetros.');
                     console.debug(JSON.stringify(res));
                 }
             }).catch(this.handleError);
        } else {
            this.toastr.info('No se han ejecutado cambios.');
        }
    }

    loadSamplingInfo(sampName): void {
        // se cargan los parámetros preeliminares
        this.service.getIdSampDescIdSampType(sampName).then( data => {
            this.sampleInfo = {
                pId_Sampling : data[0].idSampling,
                pDescription : data[0].description,
                pIdSamplingType : data[0].SamplingType_idSamplingType,
            };

            // se cargan usuarios que no pertenecen al muestreo
            this.service.getUsers({ pIdSampling: this.sampleInfo.pId_Sampling }).then((dataz) => {
                this.sourceUsers.load(dataz);
            }).catch(err => console.debug('Error al cargar los usuarios.'));

            // se cargan parámetros preliminares
            this.service.getPreParam(this.sampleInfo).then((dataz) => {
                this.sourcePreParam.load(dataz);
            }).catch(err => console.debug('Error al cargar los datos preliminares.'));

            // se cargan parámetros definitivos
            this.service.getDefParam(this.sampleInfo).then((dataz) => {
                this.sourceDefParam.load(dataz);
            }).catch(err => console.debug('Error al cargar los datos definitivos.'));

            // se cargan tabla de colaboradores
            this.service.getColaborators(sampName).then((dataz) => {
                this.colaborators = dataz;
            }).catch(err => console.debug('Error al cargar los colaboradores.'));
        });
    }

    onEditConfirmPreParam(event): void {
        console.debug("hola" + JSON.stringify(this.sampleInfo));
        console.debug("new Data" +  JSON.stringify(event.newData));
        console.debug("funcion" +JSON.stringify(this.service.createComposePre(this.sampleInfo, event.newData)));
        this.service.editPreParam(this.service.createComposePre(this.sampleInfo, event.newData))
        .then(res => {
            if (res.error === 'none') {
                event.confirm.resolve();
            }else {
                this.toastr.error('Por favor, compruebe los parámetros.');
                console.debug('editConfirmPreParam' + JSON.stringify(res));
                event.confirm.reject();
            }
        }).catch(this.handleError);
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

}
