import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMainComponent } from './components/form-main/form-main.component';
import { FormDetailsComponent } from './components/form-main/form-people/form-details/form-details.component';
import { FormPeopleComponent } from './components/form-main/form-people/form-people.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'form',
    component: FormMainComponent,
    children: [
      { path: 'people', component: FormPeopleComponent },
      { path: 'people/:UserName', component: FormDetailsComponent },
      { path: 'people/:UserName/edit', component: FormPeopleComponent },
    ],
  },
  { path: '', pathMatch: 'prefix', redirectTo: 'form' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
