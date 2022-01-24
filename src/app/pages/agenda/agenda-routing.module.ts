import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AgendaPageComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    component: AgendaPageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class AgendaRoutingModule {
}