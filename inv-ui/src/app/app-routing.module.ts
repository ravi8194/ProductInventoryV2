import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FourzerofourComponent } from '../app/fourzerofour/fourzerofour.component';
import { AuthGuard } from './auth/auth.guard';

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  { path: '**', component: FourzerofourComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
