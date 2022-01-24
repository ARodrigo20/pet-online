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

  constructor(private service: DashboardService,
    private binaceService: BinanceService) {
    this.dailyLineChartData$ = this.service.loadDailyLineChartData();
    this.performanceChartData$ = this.service.loadPerformanceChartData();
    this.revenueChartData$ = this.service.loadRevenueChartData();
    this.serverChartData$ = this.service.loadServerChartData();
    this.supportRequestData$ = this.service.loadSupportRequestData();
    this.visitsChartData$ = this.service.loadVisitsChartData();
    this.projectsStatsData$ = this.service.loadProjectsStatsData();
  }

  prueba() {
    // let ts = (Math.floor(new Date().getTime())+18000);
    console.log("prueba: ", (Math.floor(Date.now())+18000));
    // console.log("prueba2: ", ts);
    // console.log("crip: ", this.createHmacSignature(ts));

    // this.binaceService.get().subscribe({
    //   next: (resp) => { 
    //     console.log("respuesta: ", resp);
    //   },
    //   error: (error) => { 
    //     console.log("error: ", error);
        
    //   }
    // });
  }

  createHmacSignature(timestamps: number) {
    const key = CryptoJS.enc.Utf8.parse("ZVsYXstmUItyDIQ9lvVT3DSv6H5o7DrmFHly4DPbXlpBh8Hdsmcbr4C7mkgmUjQh")
    const timestamp = CryptoJS.enc.Utf8.parse(timestamps)
    const hmac = CryptoJS.enc.Hex.stringify(CryptoJS.HmacSHA256(timestamp, key))

    //  const hmac = CryptoJS.HmacSHA256(ts, privateKey).toString(CryptoJS.enc.Hex)
    return hmac;
  }
}
