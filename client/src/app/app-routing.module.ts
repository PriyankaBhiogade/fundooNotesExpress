import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetComponent } from './components/reset/reset.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateNotesComponent } from './components/create-notes/create-notes.component';
import { CreateNoteDialogboxComponent } from './components/create-note-dialogbox/create-note-dialogbox.component';
import { GetNotesComponent } from './components/get-notes/get-notes.component';
import { ProfileComponent } from './components/profile/profile.component';


const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  { path: 'reset/:token', component: ResetComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'create-notes', component: CreateNotesComponent },
  { path: 'create-note-dialogbox', component: CreateNoteDialogboxComponent },
  { path: 'GetNotes', component: GetNotesComponent },
  { path: 'Profile', component: ProfileComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
