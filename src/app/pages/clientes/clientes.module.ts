import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ClientesPageComponent } from './containers';
import { ClientesRoutingModule } from './clientes-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { DxDataGridModule } from 'devextreme-angular';

@NgModule({
  declarations: [ClientesPageComponent],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    MatCardModule,
    MatToolbarModule,
    SharedModule,
    DxDataGridModule
  ]
})
export class ClientesModule { }
