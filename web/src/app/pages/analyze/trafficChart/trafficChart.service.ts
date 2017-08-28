import {Injectable} from '@angular/core';
import {BaThemeConfigProvider, colorHelper} from '../../../theme';

@Injectable()
export class TrafficChartService {

    constructor(private _baConfig: BaThemeConfigProvider) {
    }


    getData() {
        const dashboardColors = this._baConfig.get().colors.dashboard;
        return {
            totalActivities: 6100,
            samples: [{
                value: 2000,
                color: dashboardColors.white,
                highlight: colorHelper.shade(dashboardColors.white, 15),
                label: 'Otros',
                percentage: 2000,
                order: 1,
            }, {
                value: 1500,
                color: dashboardColors.gossip,
                highlight: colorHelper.shade(dashboardColors.gossip, 15),
                label: 'Esperando',
                percentage: 1500,
                order: 4,
            }, {
                value: 1000,
                color: dashboardColors.silverTree,
                highlight: colorHelper.shade(dashboardColors.silverTree, 15),
                label: 'Comiendo',
                percentage: 1000,
                order: 3,
            }, {
                value: 1200,
                color: dashboardColors.surfieGreen,
                highlight: colorHelper.shade(dashboardColors.surfieGreen, 15),
                label: 'WC',
                percentage: 1200,
                order: 2,
            }, {
                value: 400,
                color: dashboardColors.blueStone,
                highlight: colorHelper.shade(dashboardColors.blueStone, 15),
                label: 'Caminando',
                percentage: 400,
                order: 0,
            }],
        };
    }
}
