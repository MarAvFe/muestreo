import {Injectable} from '@angular/core';

import {BaThemeConfigProvider} from '../../theme';

@Injectable()
export class AnalyzeService {

    private _data = {

        productivityData: {
            labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49],
            series: [
                [0, 67.0, 36.5, 44.0, 55.5, 47.4, 55.166666666666664, 50.857142857142854, 52.375, 54.111111111111114, 58.3, 53.72727272727273, 51.916666666666664, 53.46153846153846, 49.785714285714285, 48.333333333333336, 45.75, 44.76470588235294, 46.22222222222222, 46.526315789473685, 47.25, 48.38095238095238, 46.5, 47.30434782608695, 45.916666666666664, 44.6, 43.57692307692308, 42.851851851851855, 43.92857142857143, 44.689655172413794, 46.53333333333333, 47.354838709677416, 46.09375, 46.666666666666664, 46.970588235294116, 45.74285714285714, 44.94444444444444, 44.513513513513516, 45.18421052631579, 45.205128205128204, 44.525, 44.63414634146341, 43.904761904761905, 43.53488372093023, 43.38636363636363, 43.022222222222226, 42.130434782608695, 41.851063829787236, 41.791666666666664, 42.673469387755105]
            ]
        },
        productivityOptions: {
            color: this._baConfig.get().colors.defaultText,
            fullWidth: true,
            height: '300px',
            chartPadding: {
                right: 40
            }
        },
        improductivitiesData: {
            labels: ["Esperando","WC","Comiendo","Caminando","Otros"],
            series: [12, 8, 6, 15, 9]
        },
        improductivitiesOptions: {
            fullWidth: true,
            donut: true,
            height: '300px',
            weight: '300px',
            labelDirection: 'explode',
            labelInterpolationFnc: function (value) {
                return value;
            }
        },
        observationsData: [
            {
                id: 1,
                firstName: 'Mark',
                lastName: 'Otto',
                username: '@mdo',
                email: 'mdo@gmail.com',
                age: '28'
            },
            {
                id: 2,
                firstName: 'Jacob',
                lastName: 'Thornton',
                username: '@fat',
                email: 'fat@yandex.ru',
                age: '45'
            },
            {
                id: 3,
                firstName: 'Larry',
                lastName: 'Bird',
                username: '@twitter',
                email: 'twitter@outlook.com',
                age: '18'
            },
            {
                id: 4,
                firstName: 'John',
                lastName: 'Snow',
                username: '@snow',
                email: 'snow@gmail.com',
                age: '20'
            },
            {
                id: 5,
                firstName: 'Jack',
                lastName: 'Sparrow',
                username: '@jack',
                email: 'jack@yandex.ru',
                age: '30'
            },
            {
                id: 6,
                firstName: 'Ann',
                lastName: 'Smith',
                username: '@ann',
                email: 'ann@gmail.com',
                age: '21'
            },
            {
                id: 7,
                firstName: 'Barbara',
                lastName: 'Black',
                username: '@barbara',
                email: 'barbara@yandex.ru',
                age: '43'
            },
            {
                id: 8,
                firstName: 'Sevan',
                lastName: 'Bagrat',
                username: '@sevan',
                email: 'sevan@outlook.com',
                age: '13'
            },
            {
                id: 9,
                firstName: 'Ruben',
                lastName: 'Vardan',
                username: '@ruben',
                email: 'ruben@gmail.com',
                age: '22'
            },
            {
                id: 10,
                firstName: 'Karen',
                lastName: 'Sevan',
                username: '@karen',
                email: 'karen@yandex.ru',
                age: '33'
            },
            {
                id: 11,
                firstName: 'Mark',
                lastName: 'Otto',
                username: '@mark',
                email: 'mark@gmail.com',
                age: '38'
            },
            {
                id: 12,
                firstName: 'Jacob',
                lastName: 'Thornton',
                username: '@jacob',
                email: 'jacob@yandex.ru',
                age: '48'
            },
            {
                id: 13,
                firstName: 'Haik',
                lastName: 'Hakob',
                username: '@haik',
                email: 'haik@outlook.com',
                age: '48'
            },
            {
                id: 14,
                firstName: 'Garegin',
                lastName: 'Jirair',
                username: '@garegin',
                email: 'garegin@gmail.com',
                age: '40'
            },
            {
                id: 15,
                firstName: 'Krikor',
                lastName: 'Bedros',
                username: '@krikor',
                email: 'krikor@yandex.ru',
                age: '32'
            },
            {
                "id": 16,
                "firstName": "Francisca",
                "lastName": "Brady",
                "username": "@Gibson",
                "email": "franciscagibson@comtours.com",
                "age": 11
            },
            {
                "id": 17,
                "firstName": "Tillman",
                "lastName": "Figueroa",
                "username": "@Snow",
                "email": "tillmansnow@comtours.com",
                "age": 34
            },
            {
                "id": 18,
                "firstName": "Jimenez",
                "lastName": "Morris",
                "username": "@Bryant",
                "email": "jimenezbryant@comtours.com",
                "age": 45
            }
        ]
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
