import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor() { } 

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // let currenToken = this.authService.getToken();
        // if (currenToken) {
        //     request = request.clone({
        //         setHeaders: {
        //             'AppSGD' :currenToken
        //         }
        //     });
        //     console.log("req:: ", request);
        // }
        request = request.clone({
                    setHeaders: {
                        'x-mbx-apikey':'y5EqWPbTIR38xTXQIqNTiNXOwsb8OAr366uFTg1Rl6htjt6k1trB8oR6dp8ut7gw'
                    }
                });
        console.log("req: ", request);
        return next.handle(request);
    }
}