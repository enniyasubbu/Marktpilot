import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';

const routes: Routes = [
{
  path: '',
  children: [
    {
      path: 'overview',
      loadChildren: () => import('./overview/overview.module').then(m => m.OverviewModule),
    },
    {path: '',
  redirectTo: '/overview',
pathMatch: 'full'},
  ]
}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
