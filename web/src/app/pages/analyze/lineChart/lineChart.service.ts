import {Injectable} from '@angular/core';
import {BaThemeConfigProvider, colorHelper, layoutPaths} from '../../../theme';

@Injectable()
export class LineChartService {

    constructor(private _baConfig:BaThemeConfigProvider) {
    }

    getData() {

        var layoutColors = this._baConfig.get().colors;
        var graphColor = this._baConfig.get().colors.custom.dashboardLineChart;

        return {
            type: 'serial',
            theme: 'black',
            marginTop: 15,
            marginRight: 15,
            responsive: {
                'enabled': false
            },
            dataProvider: [
                { date: new Date(2012, 4), value: 2.3},
                { date: new Date(2012, 6), value: 90.5, comment: 'Se paga bonificación' },
                { date: new Date(2012, 8), value: 46.67 },
                { date: new Date(2012, 10), value: 39.1 },
                { date: new Date(2012, 11), value: 36.4 },
                { date: new Date(2013, 3), value: 41.33 },
                { date: new Date(2013, 6), value: 48.43 },
                { date: new Date(2013, 10), value: 49.88 },
                { date: new Date(2014, 1), value: 47.11 },
                { date: new Date(2014, 2), value: 45.6 },
                { date: new Date(2014, 3), value: 43.09 },
                { date: new Date(2014, 4), value: 44.92 },
                { date: new Date(2014, 8), value: 43.85 },
                { date: new Date(2014, 11), value: 43.57 },
                { date: new Date(2015, 3), value: 47.2 },
                { date: new Date(2015, 5), value: 47.81 },
                { date: new Date(2015, 7), value: 47.71 },
                { date: new Date(2015, 8), value: 46.06 },
                { date: new Date(2015, 10), value: 48.47 },
                { date: new Date(2015, 11), value: 51 },
                { date: new Date(2016, 3), value: 51.62 },
                { date: new Date(2016, 4), value: 53.41 },
                { date: new Date(2016, 6), value: 54.26 },
                { date: new Date(2016, 7), value: 53.54 },
                { date: new Date(2016, 11), value: 54.24 },
                { date: new Date(2017, 1), value: 54.73 },
                { date: new Date(2017, 5), value: 53.56 },
                { date: new Date(2017, 7), value: 54.43 },
                { date: new Date(2017, 10), value: 54.69 },
                { date: new Date(2018, 2), value: 55.57 },
            ],
            chartScrollbar: {
                autoGridCount: true,
                graph: 'g1',
                scrollbarHeight: 40,
                oppositeAxis: false,
                color: '#000000',
                offset: 5
            },
            categoryField: 'date',
            categoryAxis: {
                parseDates: true,
                gridAlpha: 0.1,
                color: '#000',
                axisColor: '#000',
                //title: 'Días',
                minHorizontalGap: 40,
                tickPosition: 'middle',
                tickLength: 5
            },
            valueAxes: [
                {
                    minVerticalGap: 30,
                    gridAlpha: 0.1,
                    color: layoutColors.defaultText,
                    axisColor: layoutColors.defaultText,
                    title: 'Productividad (%)',
                    precision: 2
                }
            ],
            graphs: [
                {
                    id: 'g1',
                    bullet: 'round',
                    bulletColor: '#00ff99',
                    bulletAlpha: 0.9,
                    bulletSize: 15,
                    useLineColorForBulletBorder: true,
                    lineColor: colorHelper.hexToRgbA(graphColor, 0.8),
                    lineThickness: 3,
                    negativeLineColor: layoutColors.danger,
                    type: 'smoothedLine',
                    valueField: 'value',
                    fillAlphas: 0,
                    fillColorsField: 'lineColor',
			        balloonText: '[[comment]]'
                }
            ],
            chartCursor: {
                categoryBalloonDateFormat: 'MMM YYYY',
                categoryBalloonColor: '#4285F4',
                categoryBalloonAlpha: 0.8,
                categoryBalloonText: 'Mes [[category]]',
		        valueBalloonsEnabled: false,
                cursorAlpha: 1,
                valuePrecision: 1,
                valueLineBalloonEnabled: false,
                valueLineAlpha: 0.1,
                balloonPointerOrientation: 'vertical'
            },
            dataDateFormat: 'MM YYYY',
            export: {
                enabled: true
            },
            creditsPosition: 'bottom-right',
            zoomOutButton: {
                backgroundColor: '#fff',
                backgroundAlpha: 0.5,
                color: '#000000',
            },
            zoomOutText: 'Ver todo',
            pathToImages: layoutPaths.images.amChart
        };
    }
}
