import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../app/Login/login/login.component';
import {CaseListComponent } from '../app/case/case-list/case-list.component'
import {TranslateModule} from '@ngx-translate/core';
import {CaseDetailComponent } from '../app/case/case-detail/case-detail.component';
import { from } from 'rxjs';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'case', component: CaseListComponent},
  { path: 'case-detail', component: CaseDetailComponent} 
  // {
  //   path: 'settings',
  //   loadChildren: () => import('./settings/settings-routing.module').then(m=>m.SettingsRoutingModule)
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule,TranslateModule]
})
export class AppRoutingModule { }
