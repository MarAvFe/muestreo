import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { colorHelper } from './theme.constants';

@Injectable()
export class BaThemeConfigProvider {

  private basic: any;
  private colorScheme: any;
  private dashboardColors: any;
  private conf: any;

  constructor() {
    this.basic = {
      default: '#ffffff',
      defaultText: '#ffffff',
      border: '#dddddd',
      borderDark: '#aaaaaa',
    };

    // main functional color scheme
    this.colorScheme = {
      primary: '#00abff',
      info: '#40daf1',
      success: '#8bd22f',
      warning: '#e7ba08',
      danger: '#f95372',
    };

    // dashboard colors for charts
    this.dashboardColors = {
      blueStone: '#40daf1',
      surfieGreen: '#00abff',
      silverTree: '#1b70ef',
      gossip: '#3c4eb9',
      white: '#ffffff',
      lightblue1: '#31ACBE',
      darkblue1: '#1C636D',
      lightblue2: '#8CCCD5',
      purple1: '#4A4DA8',
      purple2: '#6406C7',
      green1: '#0A9281',
      darkblue2: '#1D405E',
      lightgreen1: '#25E099',
      darkgreen1: '#145D3C',
      darkgreen2: '#597F6E',
      lightblue3: '#A8CFD6',
      lightpurple1: '#A8ABD6',
      lightpurple2: '#CFA8D6',
      blue1: '#6394CF',
      darkblue3: '#01355D',
    };

    this.conf = {
      theme: {
        name: 'ng2',
      },
      colors: {
        default: this.basic.default,
        defaultText: this.basic.defaultText,
        border: this.basic.border,
        borderDark: this.basic.borderDark,

        primary: this.colorScheme.primary,
        info: this.colorScheme.info,
        success: this.colorScheme.success,
        warning: this.colorScheme.warning,
        danger: this.colorScheme.danger,

        primaryLight: colorHelper.tint(this.colorScheme.primary, 30),
        infoLight: colorHelper.tint(this.colorScheme.info, 30),
        successLight: colorHelper.tint(this.colorScheme.success, 30),
        warningLight: colorHelper.tint(this.colorScheme.warning, 30),
        dangerLight: colorHelper.tint(this.colorScheme.danger, 30),

        primaryDark: colorHelper.shade(this.colorScheme.primary, 15),
        infoDark: colorHelper.shade(this.colorScheme.info, 15),
        successDark: colorHelper.shade(this.colorScheme.success, 15),
        warningDark: colorHelper.shade(this.colorScheme.warning, 15),
        dangerDark: colorHelper.shade(this.colorScheme.danger, 15),

        dashboard: {
          blueStone: this.dashboardColors.blueStone,
          surfieGreen: this.dashboardColors.surfieGreen,
          silverTree: this.dashboardColors.silverTree,
          gossip: this.dashboardColors.gossip,
          white: this.dashboardColors.white,
          lightblue1: this.dashboardColors.lightblue1,
          darkblue1: this.dashboardColors.darkblue1,
          lightblue2: this.dashboardColors.lightblue2,
          purple1: this.dashboardColors.purple1,
          purple2: this.dashboardColors.purple2,
          green1: this.dashboardColors.green1,
          darkblue2: this.dashboardColors.darkblue2,
          lightgreen1: this.dashboardColors.lightgreen1,
          darkgreen1: this.dashboardColors.darkgreen1,
          darkgreen2: this.dashboardColors.darkgreen2,
          lightblue3: this.dashboardColors.lightblue3,
          lightpurple1: this.dashboardColors.lightpurple1,
          lightpurple2: this.dashboardColors.lightpurple2,
          blue1: this.dashboardColors.blue1,
          darkblue3: this.dashboardColors.darkblue3,
        },

        custom: {
          dashboardPieChart: colorHelper.hexToRgbA(this.basic.defaultText, 0.8),
          dashboardLineChart: this.basic.defaultText,
        }
      }
    };
  }

  get() {
    return this.conf;
  }

  changeTheme(theme: any) {
    _.merge(this.get().theme, theme);
  }

  changeColors(colors: any) {
    _.merge(this.get().colors, colors);
  }
}
