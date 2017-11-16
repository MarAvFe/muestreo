import { Injectable } from '@angular/core';

@Injectable()
export class Globals {

  ip = 'localhost';
  port = '2828';

  toQueryString(jsonBody: Object) {
      // Receives some json and returns it in ws query format:
      // {"name": "nombre","description": "descrip."} -> name=nombre&description=
      const keys = Object.keys(jsonBody).map(key => {
          /* If null */
          if (!jsonBody[key]) {
              return '';
          }
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
