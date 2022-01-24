import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AgendaPageComponent } from './containers';
import { AgendaRoutingModule } from './agenda-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { DxFormModule, DxSchedulerModule } from 'devextreme-angular';

@NgModule({
  declarations: [AgendaPageComponent],
  imports: [
    CommonModule,
    AgendaRoutingModule,
    MatCardModule,
    MatToolbarModule,
    SharedModule,
    DxFormModule,
    DxSchedulerModule
  ]
})
export class AgendaModule { }
