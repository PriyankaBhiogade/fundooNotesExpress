import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { appMaterial } from './app.module.appMaterial';
import { MatIconModule} from '@angular/material/icon';
import { MatDividerModule} from '@angular/material/divider';
import { MatCardModule} from '@angular/material/card';
import { MatFormFieldModule} from '@angular/material/form-field';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetComponent } from './components/reset/reset.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateNotesComponent } from './components/create-notes/create-notes.component';
import { CreateNoteDialogboxComponent } from './components/create-note-dialogbox/create-note-dialogbox.component';
import { IconComponent } from './components/icon/icon.component';
import { GetNotesComponent } from './components/get-notes/get-notes.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { IsTrashComponent } from './components/is-trash/is-trash.component';
import { IsArchiveComponent } from './components/is-archive/is-archive.component';
import { ReminderComponent } from './components/reminder/reminder.component';
import { ColorComponent } from './components/color/color.component';
import { SearchComponent } from './components/search/search.component';
import { DataService } from './services/data.service';
import { EditLabeldialogboxComponent } from './components/edit-labeldialogbox/edit-labeldialogbox.component';
import { DisplayNotesComponent } from './components/display-notes/display-notes.component';
// import { AuthGuard } from './auth-guard';
// import * as firebase from 'firebase';
import {AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from '@angular/fire';
import { environment } from '.././environments/environment'

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetComponent,
    DashboardComponent,
    CreateNotesComponent,
    CreateNoteDialogboxComponent,
    IconComponent,
    GetNotesComponent,
    ProfileComponent,
    IsTrashComponent,
    IsArchiveComponent,
    ReminderComponent,
    ColorComponent,
    SearchComponent,
    EditLabeldialogboxComponent,
    DisplayNotesComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    appMaterial,
    MatDividerModule,
    ImageCropperModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    
  ],
  // ,AuthGuard
  providers: [DataService],
  bootstrap: [AppComponent],
  entryComponents: [
    ProfileComponent,CreateNoteDialogboxComponent,EditLabeldialogboxComponent]
})
export class AppModule { }
