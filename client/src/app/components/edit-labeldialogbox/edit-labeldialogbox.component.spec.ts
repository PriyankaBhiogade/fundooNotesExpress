import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLabeldialogboxComponent } from './edit-labeldialogbox.component';
import { MatCardModule, MatDividerModule, MatCheckboxModule, MatSnackBarModule, 
 MatListModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule,MatDialogRef ,MAT_DIALOG_DATA} from '@angular/material/dialog';

describe('EditLabeldialogboxComponent', () => {
  let component: EditLabeldialogboxComponent;
  let fixture: ComponentFixture<EditLabeldialogboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLabeldialogboxComponent ],
      imports:[
         MatCardModule, FormsModule,
        MatDividerModule,MatCheckboxModule,
        ,RouterModule,ReactiveFormsModule,
        RouterTestingModule,
        MatSnackBarModule,MatListModule,
        MatDialogModule, HttpClientModule,
        BrowserAnimationsModule
      ],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }]   
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLabeldialogboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
