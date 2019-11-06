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
import { IsTrashComponent } from './components/is-trash/is-trash.component';
import { IsArchiveComponent } from './components/is-archive/is-archive.component';
import { ReminderComponent } from './components/reminder/reminder.component';
import { ColorComponent } from './components/color/color.component';
import { SearchComponent } from './components/search/search.component';
import { AuthGuard } from './auth-guard';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  { path: 'reset/:token', component: ResetComponent },
  { canActivate:[AuthGuard],path: 'dashboard',component:DashboardComponent,
  

  children: [
         {path:'',component:GetNotesComponent},
         {path:'getNotes',component:GetNotesComponent},
         {path:'isArchive',component:IsArchiveComponent},
         {path:'isTrash',component:IsTrashComponent},
         {path:'reminder',component:ReminderComponent},
         {path:'search',component:SearchComponent}
  ]
},
]
  // { path: 'dashboard', component: DashboardComponent },
  // { path: 'create-notes', component: CreateNotesComponent },
  // { path: 'create-note-dialogbox', component: CreateNoteDialogboxComponent },
  // { path: 'getNotes', component: GetNotesComponent },
  // { path: 'profile', component: ProfileComponent },
  // { path: 'isArchive', component: IsArchiveComponent },
  // { path: 'isTrash', component: IsTrashComponent},
  // { path: 'reminder', component: ReminderComponent },
  // { path: 'labels', component: LabelsComponent },
  // { path: 'color', component: ColorComponent },
  // { path: 'search', component: SearchComponent }


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
