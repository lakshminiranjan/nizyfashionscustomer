import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddContactComponent } from './components/add-contact/add-contact.component';
import { ContactManagerComponent } from './components/contact-manager/contact-manager.component';
import { EditContactComponent } from './components/edit-contact/edit-contact.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ViewContactComponent } from './components/view-contact/view-contact.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent }, // Set the login component as the initial route
  {
    path: 'contacts', canActivate: [AuthGuard], children: [
      { path: 'admin', component: ContactManagerComponent },
      { path: 'add', component: AddContactComponent },
      { path: 'edit/:contactId', component: EditContactComponent },
      { path: 'view/:contactId', component: ViewContactComponent },
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
