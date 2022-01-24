import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Usuario } from '@app/_general/models/user.model';
import { SessionService } from '@app/_general/services/session.service';

import { routes } from '../../../../consts';
import { User } from '../../../../pages/auth/models';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  @Input() user: User;
  @Output() signOut: EventEmitter<void> = new EventEmitter<void>();
  public routes: typeof routes = routes;
  public flatlogicEmail: string = "https://flatlogic.com";

  public oUsuario: Usuario;

  constructor(
    private sessionService: SessionService
  ) {
    this.oUsuario = (this.sessionService.getUsuario()) ? this.sessionService.getUsuario() : new Usuario();
  }

  public signOutEmit(): void {
    //this.signOut.emit();
    this.sessionService.logout();
  }
}
