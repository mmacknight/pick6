import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateLeagueComponent } from './create-league/create-league.component';
import { LeagueComponent } from './league/league.component';
import { LeagueAdminComponent } from './league-admin/league-admin.component';
import { AccountComponent } from './account/account.component';

const routes: Routes = [
   { path: '', component: DashboardComponent},
   { path: 'register', component: RegisterComponent},
   { path: 'login', component: LoginComponent},
   { path: 'account', component: AccountComponent},
   { path: 'createleague', component: CreateLeagueComponent},
   { path: 'league/:id', component: LeagueComponent},
   { path: 'leagueadmin/:id', component: LeagueAdminComponent}
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
   LeagueComponent,
   LeagueAdminComponent,
   AccountComponent
]
