import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule, MatIconModule, MatFormFieldModule, MatChipsModule, MatMenuModule, MatDividerModule, MatCheckboxModule, MatSnackBarModule, MatListModule, MatDialogModule } from '@angular/material';

import { DisplayNotesComponent } from './display-notes.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconComponent } from '../icon/icon.component';

describe('DisplayNotesComponent', () => {
  let component: DisplayNotesComponent;
  let fixture: ComponentFixture<DisplayNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayNotesComponent,IconComponent ],
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
    fixture = TestBed.createComponent(DisplayNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
