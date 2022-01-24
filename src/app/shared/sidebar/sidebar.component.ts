import { Component } from '@angular/core';
import { Acceso } from '@app/_general/models/acceso.model';
import { SessionService } from '@app/_general/services/session.service';
import { routes } from '../../consts/routes';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  public routes: typeof routes = routes;
  public isOpenUiElements = false;

  public aAccesos: Acceso[] = [];

  constructor(private sessionService: SessionService) {
    this.aAccesos = (sessionService.getAcceso()) ? sessionService.getAcceso() : [];
  }

  public openUiElements() {
    this.isOpenUiElements = !this.isOpenUiElements;
  }
}
