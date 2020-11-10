import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { LogOutComponent } from './components/log-out/log-out.component';
import { SurveyComponent } from './components/survey/survey.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GuardService } from './services/guard.service';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'survey' },
  { path: 'login', component: LogInComponent, canActivate: [GuardService] },
  { path: 'logout', component: LogOutComponent },
  { path: 'survey', component: SurveyComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [GuardService] },
  {path: '**', redirectTo: 'survey', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
