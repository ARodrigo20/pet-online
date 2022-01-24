import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserPass } from 'src/app/_general/models/userpass.model';
import { AuthService } from '@app/_general/services/auth.service';
import { MessageService } from '@app/_general/services/message.service';
import { SessionService } from '@app/_general/services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  @Output() sendLoginForm = new EventEmitter<void>();
  public form: FormGroup;
  public email = 'madara.sdp@gmail.com';
  public password = 'Loseyourself20.';

  constructor(
    public router: Router,
    private authService: AuthService,
    private messageService: MessageService,
    private sessionService: SessionService
  ) {
    
  }

  public ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(this.email, [Validators.required, Validators.email]),
      password: new FormControl(this.password, [Validators.required])
    });
  }

  public login(): void {
    if (this.form.valid) {
      let user: UserPass = new UserPass();
      user.email = this.form.value["email"];
      user.password = this.form.value["password"];
      user.remember_me = this.form.value["remember_me"];

      this.authService.autentication(user).subscribe({
        next: (resp) => { 
          console.log("respuesta: ", resp);
          this.messageService.renderMensaje("wait", "Ingresando al sistema", 1000);
          this.sessionService.setData(resp.body);
          //this.sendLoginForm.emit();
          this.router.navigate(["/dashboard"]);
        },
        error: (error) => { 
          console.log("error: ", error);
          this.messageService.renderMensaje("error", error.message );
        }
      });

      // this.authService.autentication(user).subscribe((resp: any) => {
      //   if (resp.body.nCodError === 0) {
      //     // this.messageService.renderMensaje("wait", "Ingresando al sistema", 1000);
      //     // console.log("token", resp.headers.get('cache-control'));
      //     // this.authService.setEncriptPassword(user.password, user.remember_me);
      //     // this.authService.setData(resp.body);
      //     // this.router.navigate(["/welcome"]);
      //   } else {
      //     //this.messageService.renderMensaje("error", resp.body.cMsjError);
      //   }
      // }, error => {
      //   console.log("error: ", error);
      // });
    } else {
      this.messageService.renderMensaje("info", "Ingresa tus credenciales");
    }
  }
}
