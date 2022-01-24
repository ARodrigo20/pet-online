import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ToastaService, ToastaConfig, ToastOptions, ToastData} from 'ngx-toasta';

@Injectable({
	providedIn: "root"
})
export class MessageService{

    constructor(private http: HttpClient,
        private toastaService:ToastaService, private toastaConfig: ToastaConfig) {}
    
    renderMensaje(tipo: string, mensaje: string, time?: number) {

        let toastOptions:ToastOptions = {
            title: "",
            msg: mensaje,
            showClose: true,
            showDuration: true,
            timeout: (time) ? time : 2000,
            theme: "material"
        };

        switch (tipo) {
            case 'success':
                toastOptions.title = "Exito"
                this.toastaService.success(toastOptions);
                break;
            case 'error':
                toastOptions.title = "Error"
                this.toastaService.error(toastOptions);
                break;
            case 'warning':
                toastOptions.title = "Advertencia"
                this.toastaService.warning(toastOptions);
                break;
            case 'default':
                toastOptions.title = "Mensaje"
                this.toastaService.default(toastOptions);
                break;
            case 'wait':
                toastOptions.title = "Espere"
                this.toastaService.wait(toastOptions);
                break;
            case 'info':
                toastOptions.title = "Informacion"
                this.toastaService.info(toastOptions);
                break;
        }
    }
}