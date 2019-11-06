import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule,MatCardModule,MatMenuModule,MatDividerModule,MatCheckboxModule,MatSnackBarModule,
   MatToolbarModule, MatSidenavModule, MatInputModule, MatDialogModule, MatListModule,
  } from '@angular/material'

import { DashboardComponent } from './dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CreateNotesComponent } from '../create-notes/create-notes.component';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IconComponent } from '../icon/icon.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent ,CreateNotesComponent,IconComponent ],
      imports:[
        MatIconModule, MatCardModule,
        MatDividerModule,MatCheckboxModule,
        MatToolbarModule,MatSidenavModule,
        RouterModule,MatMenuModule,
        MatInputModule,ReactiveFormsModule,
        FormsModule, RouterTestingModule,
        MatSnackBarModule,MatListModule,
        MatDialogModule, HttpClientModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
