import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { LocalDataSource } from 'ng2-smart-table';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CreateSamplingModal } from './components/create-sampling-modal.component';
import { User } from './objects/User';

@Component({
    selector: 'profile',
    templateUrl: 'profile.html',
})
export class ProfileComponent implements OnInit {
    samplings: any;
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

    source: LocalDataSource = new LocalDataSource();
    samplingTypes: any;
    cedula: string = '';
    user: User = new User();

    constructor(private route: ActivatedRoute, private router: Router,
        private _profileService: ProfileService, private modalService: NgbModal) {

        }

        createSamplingModal() {
            const activeModal = this.modalService.open(CreateSamplingModal, { size: 'sm', backdrop: 'static' });
            activeModal.componentInstance.modalHeader = 'Crear muestreo';
            activeModal.componentInstance.modalSaProfileComponentProfileComponentmplingTypes = this.samplingTypes;
        }

        ngOnInit() {
            this.cedula = localStorage.getItem('cedula');
            if (this.cedula !== null) {
                this._profileService.getUser(this.cedula)
                .then( user => this.user = user as User)
                .catch( err => console.error(err));

                this._profileService.getBasicSamplings()
                .then(data => {
                    this.samplings = data;
                });
            } else {
                this.router.navigate(['/logout']);
            }
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
