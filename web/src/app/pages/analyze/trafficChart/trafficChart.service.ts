import { Injectable } from '@angular/core';
import { BaThemeConfigProvider, colorHelper } from '../../../theme';
import { ImproductiveAct } from './Objects/ImproductiveAct';
import { ChartActivity } from './Objects/ChartActivity';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TrafficChartService {

  options: any;
  heads: any;
  parametros: any;

  constructor(private _baConfig: BaThemeConfigProvider, private http: Http) {
    this.heads = new Headers();
    this.heads.append('Content-Type', 'application/x-www-form-urlencoded');
    this.heads.append('Access-Control-Allow-Origin', '*');
    this.heads.append('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, access-control-allow-origin');
    this.options = { headers : this.heads, withCredentials : true };
 }

      private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
      }

      //lista los comentario pertenecientes a un muestreo
      getImproductiveActs(data): Promise<ImproductiveAct[]> {
          const body = this.toQueryString( { pIdSampling: data });
         console.debug(JSON.stringify('body comment'));
          console.debug(JSON.stringify(body));
          return this.http.post('http://localhost:2828/getImproductiveAct', body, this.options )
          .toPromise()
          .then(response => response.json().data[0] as ImproductiveAct[])
          .catch(this.handleError);
      }

    getData(data): Promise<{totalActivities: number, samples: ChartActivity[]}> {
     return this.getImproductiveActs(data).then( res => {
        let k = 0;
         const chartActs: ChartActivity[] = [];
         for (const c of res) {
             k += c.num;
          const tmp: any = {
            value: c.num,
            color: '#000',
            highlight: '#FFF',
            label : c.name,
            percentage: 200,
            order : 2,
          };
           chartActs.push(tmp as ChartActivity);
       }
        return { samples: chartActs, totalActivities: k };
    }).catch(this.handleError);

  /*      const dashboardColors = this._baConfig.get().colors.dashboard;
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
        };*/
    }

    private toQueryString(jsonBody: Object) {
        // Receives some json and returns it in ws query format:
        // {"name": "nombre","description": "descrip."} -> name=nombre&description=descrip
        console.debug(jsonBody);
        const keys = Object.keys(jsonBody).map(key => {
            /* If boolean */
            if (jsonBody[key] === 'false' || jsonBody[key] === 'true' ) {
                jsonBody[key] = jsonBody[key] === 'true' ? 1 : 0;
            }
            /* If bit {"type": "Buffer","data": [1]} */
            if (jsonBody[key].type ) {
                jsonBody[key] = jsonBody[key].data[0];
            }
            return [key, jsonBody[key]].join('=');
        });
        const str = keys.join('&');
        return str;
    }


}
