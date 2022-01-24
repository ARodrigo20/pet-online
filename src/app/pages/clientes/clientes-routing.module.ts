import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ClientesPageComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    component: ClientesPageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class ClientesRoutingModule {
}