import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import { UserPass } from "../models/userpass.model";
import { environment } from "../../../environments/environment";

@Injectable({
	providedIn: "root"
})
export class AuthService{
    constructor(private http: HttpClient) {}
    
    autentication(userpass: UserPass): Observable<any> {
        return this.http.post<any>(`${environment.apiBase}` + 'login', userpass, {observe: 'response'});
    }

    getData(): Observable<any> {
        return this.http.get<any>('http://localhost:4000/data', {observe: 'response'});
    }
}