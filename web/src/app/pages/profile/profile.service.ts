import {Injectable} from '@angular/core';

import {BaThemeConfigProvider} from '../../theme';

@Injectable()
export class ProfileService {

    private _data = {

    };

    constructor(private _baConfig:BaThemeConfigProvider) {
    }

    public getAll() {
        return this._data;
    }

    getData(): Promise<any> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this._data.observationsData);
            }, 2000);
        });
    }

    public getResponsive(padding, offset) {
        return [
            ['screen and (min-width: 1550px)', {
                chartPadding: padding,
                labelOffset: offset,
                labelDirection: 'explode',
                labelInterpolationFnc: function (value) {
                    return value;
                }
            }],
            ['screen and (max-width: 1200px)', {
                chartPadding: padding,
                labelOffset: offset,
                labelDirection: 'explode',
                labelInterpolationFnc: function (value) {
                    return value;
                }
            }],
            ['screen and (max-width: 600px)', {
                chartPadding: 0,
                labelOffset: 0,
                labelInterpolationFnc: function (value) {
                    return value[0];
                }
            }]
        ];
    }
}
