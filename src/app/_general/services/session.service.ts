import { HttpEvent, HttpHandler, HttpRequest } from "@angular/common/http";
import {Injectable} from "@angular/core";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import { environment } from "@environments/environment";
import { Observable } from "rxjs";
import { Acceso } from "../models/acceso.model";
import { Usuario } from "../models/user.model";
import { UserPass } from "../models/userpass.model";
import { AuthService } from "./auth.service";
import { MessageService } from "./message.service";

@Injectable({
	providedIn: "root"
})
export class SessionService {
    
	public acceso: Acceso[];
    public access_token: string;
    public refresh_token: string;
    public usuario: Usuario;

	constructor(public router: Router, public activeRoute: ActivatedRoute, private authService: AuthService, private messageService: MessageService) {
	}

	public getAcceso(): any {
		if (!this.acceso) {
			return (this.acceso = JSON.parse(localStorage.getItem("acceso")));
		}
		return this.acceso;
	}

    public getAccessToken(): string {
		if (!this.access_token) {
			return (this.access_token = localStorage.getItem("access_token"));
		}
		return this.access_token;
	}

    public getUsuario(): Usuario {
		if (!this.usuario) {
			return (this.usuario = JSON.parse(localStorage.getItem("usuario")));
		}
		return this.usuario;
	}

	public setData(data: any) {

        //this.construirLayout(data.oContenido);

		//localStorage.setItem("menu", JSON.stringify(this.menu));
        this.access_token = data.access_token;
        this.refresh_token = data.refresh_token;
        this.usuario = data.usuario;
        this.acceso = data.acceso;

        localStorage.setItem("access_token", this.access_token);
        localStorage.setItem("refresh_token", this.refresh_token);
        localStorage.setItem("usuario", JSON.stringify(this.usuario));
        localStorage.setItem("acceso", JSON.stringify(this.acceso));
    }

    isLogin(): boolean {
        if (localStorage.getItem("islogin") == "true") return true;
		return false;
	}

    isSavePassword(): boolean {
        return (localStorage.getItem("pToken")) ? true : false;
    }

	logout() {
		localStorage.clear();
		this.router.navigate(["/login"]);
	}

    construirLayout(oLayout: any) {
        // let aAccesos = (oLayout.aAccesos) ? oLayout.aAccesos : [];
        // let aMenu = [];

        // aAccesos.forEach(element => {
        //     element.children = [];
        //     if(element.nCodPadre === -1) {
        //         aMenu.push(element);
        //     } else {
        //         let _aAcceso = aMenu.find(unit => unit.nCodAcceso === element.nCodPadre);
        //         if(_aAcceso) {
        //             _aAcceso.children.push(element);
        //         }
        //     }
        // });
        // aMenu.sort(function(a, b) {
        //     return a.nPeso - b.nPeso;
        // });

        // this.usuario = oLayout.cNombre;
        // this.cUsuario = oLayout.cUsuario;

        // this.menu = aMenu;
    }


    reLogin(){
        // let user: UserPass = new UserPass();
        // user.usuario = this.getCUsuario();
        // user.password = this.getDecriptPassword();

        // this.loginService.autentication(user).subscribe((resp: any) => {
        //     console.log("resp relogin: ", resp);
        //     if(resp.body.nCodError === 0) {
        //       this.setData(resp.body);
        //         const currentUrl = this.router.url;
        //         this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        //             this.router.navigate([currentUrl]);
        //         });
        //     } else {
        //       this.messageService.renderMensaje("error", resp.body.cMsjError);
        //       this.logout();
        //     }

            
        // }, error => {
        //     console.log("error: ", error);
        //     this.messageService.renderMensaje("error", error);
        // });
    }
}