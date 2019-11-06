import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule, MatIconModule, MatFormFieldModule, MatChipsModule, MatMenuModule, MatDividerModule, MatCheckboxModule, MatSnackBarModule, MatListModule, MatDialogModule } from '@angular/material';
import { IconComponent } from '../icon/icon.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReminderComponent } from './reminder.component';

describe('ReminderComponent', () => {
  let component: ReminderComponent;
  let fixture: ComponentFixture<ReminderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReminderComponent,IconComponent ],
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
    fixture = TestBed.createComponent(ReminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
