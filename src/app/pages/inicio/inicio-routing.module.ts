import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioPage } from './inicio.page';
import { CardPage } from '../card/card.page';

const routes: Routes = [
  {
    path: '',
    component: InicioPage,
  },
  {
    path: 'action-sheet',
    loadChildren: () =>
      import('../action-sheet/action-sheet.module').then(
        (m) => m.ActionSheetPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioPageRoutingModule {}
