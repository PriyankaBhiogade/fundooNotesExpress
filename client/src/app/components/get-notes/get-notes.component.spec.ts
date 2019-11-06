import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetNotesComponent } from './get-notes.component';
import { MatCardModule, MatIconModule, MatFormFieldModule, MatChipsModule, MatMenuModule, MatDividerModule, MatCheckboxModule, MatSnackBarModule, MatListModule, MatDialogModule } from '@angular/material';
import { IconComponent } from '../icon/icon.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('GetNotesComponent', () => {
  let component: GetNotesComponent;
  let fixture: ComponentFixture<GetNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetNotesComponent ,IconComponent ],
      imports :[
        MatCardModule,MatIconModule,
        FormsModule,MatFormFieldModule,
        MatChipsModule,MatMenuModule,
        MatDividerModule,MatCheckboxModule,
        RouterTestingModule,
        MatSnackBarModule,MatListModule,
        HttpClientModule,MatDialogModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
