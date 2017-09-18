import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileService } from '../profile.service';
import { BasicSampling } from '../BasicSampling';
import { ToastsManager, Toast } from 'ng2-toastr';

@Component({
    selector: 'add-service-modal',
    styleUrls: [('./create-sampling-modal.component.scss')],
    templateUrl: './create-sampling-modal.component.html',
})

export class CreateSamplingModal implements OnInit {

    modalHeader: string;
    modalSamplingTypes: any;

    samplingTypes: any;
    model: BasicSampling = new BasicSampling('', '', 0, 0);
    submitted = false;

    constructor(public toastr: ToastsManager, vcr: ViewContainerRef,
        private _profileService: ProfileService, private activeModal: NgbActiveModal) {
            this.toastr.setRootViewContainerRef(vcr);
            this._profileService.getSamplingTypes()
            .then(data => {
                this.samplingTypes = data;
            });
        }

        ngOnInit() {}

        onSubmit() { this.submitted = true; }

        createSampling() {
            this._profileService.createBasicSampling(this.model)
            .then(res => {
                if (res.error === 'none') {
                    this.toastr.success('Se ha agregado el muestreo satisfactoriamente.');
                    this.closeModal();
                }else {
                    this.toastr.error('Por favor, compruebe los parámetros.');
                    console.debug(JSON.stringify(res));
                }
            },
        );
    }

    closeModal() {
        this.activeModal.close();
    }
}
