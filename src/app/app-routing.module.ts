import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppealPageComponent } from './appeal-page/appeal-page.component';
import { AppealComponent } from './appeal/appeal.component';
import { CreateAppealComponent } from './create-appeal/create-appeal.component';

const routes: Routes = [
  {path: '', component: CreateAppealComponent},
  {path: 'appealPage', component: AppealPageComponent, children: [
    {path: ':index', component: AppealComponent}
  ]},
  {path: '**', redirectTo: '/appealPage', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
