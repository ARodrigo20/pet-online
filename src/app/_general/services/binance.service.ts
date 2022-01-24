import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { UserPass } from "../models/userpass.model";
import { environment } from "../../../environments/environment";
import * as CryptoJS from 'crypto-js';

@Injectable({
	providedIn: "root"
})
export class BinanceService{
    constructor(private http: HttpClient) {}

    // httpOptions = {
    //     headers: new HttpHeaders({
    //         'X-MBX-APIKEY': 'y5EqWPbTIR38xTXQIqNTiNXOwsb8OAr366uFTg1Rl6htjt6k1trB8oR6dp8ut7gw'
    //     })
    // }

    //'X-MBX-APIKEY':'y5EqWPbTIR38xTXQIqNTiNXOwsb8OAr366uFTg1Rl6htjt6k1trB8oR6dp8ut7gw'
    
    post(userpass: UserPass): Observable<any> {
        return this.http.post<any>(`${environment.apiBase}` + 'login', userpass, {observe: 'response'});
    }

    get(): Observable<any> {
        return this.http.get<any>('https://api.binance.com/api/v3/allOrders?symbol=BTCUSDT&timestamp=' + (Math.floor(new Date().getTime())+18000) + '&signature=' + this.createHmacSignature((Math.floor(new Date().getTime())+18000)));
    }

    createHmacSignature(timestamps: number) {
        const key = CryptoJS.enc.Utf8.parse("ZVsYXstmUItyDIQ9lvVT3DSv6H5o7DrmFHly4DPbXlpBh8Hdsmcbr4C7mkgmUjQh")
        const timestamp = CryptoJS.enc.Utf8.parse(timestamps)
        const hmac = CryptoJS.enc.Hex.stringify(CryptoJS.HmacSHA256(timestamp, key))
    
        //  const hmac = CryptoJS.HmacSHA256(ts, privateKey).toString(CryptoJS.enc.Hex)
        return hmac;
    }
}