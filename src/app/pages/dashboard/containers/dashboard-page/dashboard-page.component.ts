import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';

import { DashboardService } from '../../services';
import {
  DailyLineChartData,
  PerformanceChartData,
  ProjectStatData,
  RevenueChartData,
  ServerChartData,
  SupportRequestData,
  VisitsChartData
} from '../../models';
import { BinanceService } from '@app/_general/services/binance.service';
import { AuthService } from '@app/_general/services/auth.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent {
  public dailyLineChartData$: Observable<DailyLineChartData>;
  public performanceChartData$: Observable<PerformanceChartData>;
  public revenueChartData$: Observable<RevenueChartData>;
  public serverChartData$: Observable<ServerChartData>;
  public supportRequestData$: Observable<SupportRequestData[]>;
  public visitsChartData$: Observable<VisitsChartData>;
  public projectsStatsData$: Observable<ProjectStatData>;

  data: any[] = [];
  highAverageColor = '#3DD03E';
  lowAverageColor = '#2278B3';

  point: any;

  constructor(private service: DashboardService,
    private authService: AuthService,
    private binaceService: BinanceService) {
    this.dailyLineChartData$ = this.service.loadDailyLineChartData();
    this.performanceChartData$ = this.service.loadPerformanceChartData();
    this.revenueChartData$ = this.service.loadRevenueChartData();
    this.serverChartData$ = this.service.loadServerChartData();
    this.supportRequestData$ = this.service.loadSupportRequestData();
    this.visitsChartData$ = this.service.loadVisitsChartData();
    this.projectsStatsData$ = this.service.loadProjectsStatsData();

    this.traerData();
  }

  traerData() {
    this.data = [];
    this.point = null;
    this.authService.getData().subscribe({
      next: (resp) => { 
        console.log("respuesta: ", resp);
        this.data = resp.body;
      },
      error: (error) => { 
        console.log("error: ", error);
      }
    });
  }

  prueba() {

    this.traerData();
    // // let ts = (Math.floor(new Date().getTime())+18000);
    // console.log("prueba: ", (Math.floor(Date.now())+18000));
    // // console.log("prueba2: ", ts);
    // // console.log("crip: ", this.createHmacSignature(ts));

    // // this.binaceService.get().subscribe({
    // //   next: (resp) => { 
    // //     console.log("respuesta: ", resp);
    // //   },
    // //   error: (error) => { 
    // //     console.log("error: ", error);
        
    // //   }
    // // });
  }

  createHmacSignature(timestamps: number) {
    const key = CryptoJS.enc.Utf8.parse("ZVsYXstmUItyDIQ9lvVT3DSv6H5o7DrmFHly4DPbXlpBh8Hdsmcbr4C7mkgmUjQh")
    const timestamp = CryptoJS.enc.Utf8.parse(timestamps)
    const hmac = CryptoJS.enc.Hex.stringify(CryptoJS.HmacSHA256(timestamp, key))

    //  const hmac = CryptoJS.HmacSHA256(ts, privateKey).toString(CryptoJS.enc.Hex)
    return hmac;
  }

  customizePoint = (arg: any) => {
    // console.log("arg: ", arg);
    if (arg.data['accion'] === "comprar") {
      return { color: this.highAverageColor };
    } if (arg.data['accion']  === "vender") {
      return { color: this.lowAverageColor };
    }
  };

  customizeLabel = (arg: any) => {
    if (arg.data['accion']  === "comprar" ) {
      return this.getLabelsSettings(this.highAverageColor);
    } if (arg.data['accion']  === "vender") {
      return this.getLabelsSettings(this.lowAverageColor);
    }
  };

  getLabelsSettings(backgroundColor: any) {
    return {
      visible: false,
      backgroundColor,
      font: {
        size: 8
      }
    };
  }

  customizeText(arg: any) {
    return `${arg.valueText}`;
  }

  customizeTooltip = (info: any) => ({
    text: `<p>esto</p>`,
  });

  // customizeTooltip(info: any) {
  //   console.log("info: ", info);
  //   return {text: 'cda'}
  // };

  pointClick(e) {
    console.log(e);
    this.point = e.target.data;
  }
}
