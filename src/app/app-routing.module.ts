import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../app/Login/login/login.component';
import { CaseComponent } from '../app/case/case.component';
import {TranslateModule} from '@ngx-translate/core';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'case', component: CaseComponent} 
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
