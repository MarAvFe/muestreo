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
import { SampledObjInfo } from './objects/SampledObjInfo';
import { Colaborator } from './objects/Colaborator';
import { SamplingType } from './objects/SamplingType';
import { PreParam } from './objects/PreParam';

@Component({
    selector: 'mySamplings',
    templateUrl: 'mySamplings.html',
    styleUrls: ['./smartTables.scss'],
})
export class MySamplingsComponent implements OnInit {
    samplingTypes: SamplingType[];
    sampleInfo: any;
    cedula: string = '';
    sampName: SamplingName[];
    colaborators: Colaborator[];

    samplings: any[] = [];
    selectedSampling: any = {
        idSampling: -1,
        name: '',
        type: '',
        idSamplingType: -1,
        description: '',
        sampled: '',
        sampledDescription: '',
        isPreliminarSampling: -1,
    };

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
            confianza: {
                title: 'Confianza',
                type: 'number',
                editable: false,
            },
            error_preliminar: {
                title: 'Error',
                type: 'number',
            },
        },
    };
    settingsUsers = {
        actions: {
            columnTitle: 'Acciones',
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
        public toastr: ToastsManager, vcr: ViewContainerRef, protected service: MySamplingsService,
    ) {
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
                if (data) {
                    this.samplings = data[0];
                    this.loadSamplingInfo(this.samplings[0].idSampling);
                } else {
                    throw 'Undefined sampling';
                }
            })
            .catch( this.handleError );
            this.getSamplingTypes();
        } else {
            this.router.navigate(['/logout']);
        }
    }

    onDeleteConfirm(event) {
        console.debug(`eventData: ${JSON.stringify(event.data)}`);
        const choice =
        window.prompt(`Escriba 'admin' en el cuadro para asignar a ${event.data.name} como administrador.`);
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

    private getSampling(id) {
        if (this.samplings) {
            for (const s of this.samplings) {
                if (s.idSampling === id) {
                    return s;
                }
            }
        }
    }

    makeDefinitive() {
        this.service.makeDefinitive(this.selectedSampling.idSampling).then((dataz) => {
            if (dataz.error === 'none') {
                this.toastr.success('El muestreo es definitivo');
                this.selectedSampling.isDefinitive = 1;
            }
        }).catch(err => this.handleError);
    }

    loadSamplingInfo(idSampling): void {
        // se cargan los parámetros preeliminares
        if (typeof idSampling === 'string') { idSampling = parseInt(idSampling); }
        const sampling = this.getSampling(idSampling);
        if (sampling) {
            this.selectedSampling = sampling;

            this.sampleInfo = {
                pId_Sampling : sampling.idSampling,
                pDescription : sampling.description,
                pIdSamplingType : sampling.idSamplingType,
            };

            // se cargan usuarios que no pertenecen al muestreo
            this.service.getUsers({ pIdSampling: sampling.idSampling }).then((dataz) => {
                this.sourceUsers.load(dataz);
            }).catch(err => this.handleError);

            // se cargan parámetros preliminares
            this.service.getPreParam(this.sampleInfo).then((dataz) => {
                const processed: PreParam[] = [];
                for (const c of dataz) {
                    const tmp: any = {
                        n_preliminar : c.n_preliminar,
                        error_preliminar : c.error_preliminar,
                        confianza : 100 - c.error_preliminar,
                    };
                    processed.push(tmp as PreParam);
                }
                this.sourcePreParam.load(processed);
            }).catch(err => this.handleError);

            // se cargan parámetros definitivos
            this.service.getDefParam(this.sampleInfo).then((dataz) => {
                this.sourceDefParam.load(dataz);
            }).catch(err => this.handleError);

            // se cargan tabla de colaboradores
            this.service.getColaborators(sampling.name).then((dataz) => {
                this.colaborators = dataz;
            }).catch(err => this.handleError);

        } else {
            console.debug('ERR: Undefined sampling.');
        }
    }

    onEditSamplingDetails(): void {
        const params = {
            pId_Sampling: this.selectedSampling.idSampling,
            pSampName: this.selectedSampling.name,
            pSampDescription: this.selectedSampling.description,
            pSamplingType: this.selectedSampling.idSamplingType,
            pObjectName: this.selectedSampling.objectName,
            pObjectDescription: this.selectedSampling.objectDescription,
        };

        this.service.editSamplingDetails(params).then(res => {
            if (res.error === 'none') {
                console.debug('éxito');
                this.toastr.success('Edición exitosa.');
                this.service.getMySamplings(this.cedula)
                .then(data => {
                    if (data) {
                        this.samplings = data[0];
                        this.loadSamplingInfo(this.samplings[0].idSampling);
                    } else {
                        throw 'Undefined sampling';
                    }
                })
                .catch( this.handleError );
            }else {
                this.toastr.error('Por favor, compruebe los parámetros.');
                console.debug(`EditSamplingDetails ${JSON.stringify(res)}`);
            }
        }).catch(this.handleError);
    }

    onEditConfirmPreParam(event): void {
        this.service.editPreParam(this.service.createComposePre(this.sampleInfo, event.newData))
        .then(res => {
            if (res.error === 'none') {
                event.confirm.resolve();
            }else {
                this.toastr.error('Por favor, compruebe los parámetros.');
                console.debug(`editConfirmPreParam ${JSON.stringify(res)}`);
                event.confirm.reject();
            }
        }).catch(this.handleError);
    }

    getSamplingTypes(): void {
        this.service.getSamplingTypes()
        .then(types => {
            this.samplingTypes = types;
        })
        .catch(this.handleError);
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
