import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  // { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', loadChildren: './public/login/login.module#LoginPageModule' },
  { path: 'tabs', loadChildren: './public/tabs/tabs.module#TabsPageModule' },
  { path: 'register', loadChildren: './public/register/register.module#RegisterPageModule' },
  {
    path: 'dashboard',
    canActivate: [AuthGuardService],
    loadChildren: './members/dashboard/dashboard.module#DashboardPageModule'
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
