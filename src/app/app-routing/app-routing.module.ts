import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { AuthGaurdService } from '../auth-gaurd.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { LoginComponent } from '../login/login.component';

const routes:Routes = [
  // {path:'',  redirectTo: 'login', pathMatch: 'full'},
  {path:'login', component:LoginComponent},
  {path : '', component : LoginComponent},
  {path: 'home',component: DashboardComponent, canActivate: [AuthGaurdService]},
  {path:'**', redirectTo: 'login'}
]
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
