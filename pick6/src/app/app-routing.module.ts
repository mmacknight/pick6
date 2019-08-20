import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateLeagueComponent } from './create-league/create-league.component';
import { LeagueComponent } from './league/league.component';

const routes: Routes = [
   { path: '', component: DashboardComponent},
   { path: 'register', component: RegisterComponent},
   { path: 'login', component: LoginComponent},
   { path: 'createleague', component: CreateLeagueComponent},
   { path: 'league/:id', component: LeagueComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [
   RegisterComponent,
   LoginComponent,
   DashboardComponent,
   CreateLeagueComponent,
   LeagueComponent
]
