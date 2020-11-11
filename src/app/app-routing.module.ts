import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../app/Login/login/login.component';
<<<<<<< HEAD
import { CaseComponent } from '../app/case/case.component';
import { MasterdataComponent } from '../app/masterdata/masterdata.component';
import { CountryconfigComponent } from '../app/countryconfig/countryconfig.component';
=======
import {CaseListComponent } from '../app/case/case-list/case-list.component'
>>>>>>> refs/remotes/origin/main
import {TranslateModule} from '@ngx-translate/core';
import {CaseDetailComponent } from '../app/case/case-detail/case-detail.component';
import { from } from 'rxjs';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
<<<<<<< HEAD
  { path: 'case', component: CaseComponent} ,
  { path: 'masterdata', component: MasterdataComponent},  
  { path: 'countryconfig', component: CountryconfigComponent} 
=======
  { path: 'case', component: CaseListComponent},
  { path: 'case-detail', component: CaseDetailComponent} 
>>>>>>> refs/remotes/origin/main
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
