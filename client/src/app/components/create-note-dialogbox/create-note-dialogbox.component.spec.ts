import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule,MatCardModule,MatMenuModule,MatDividerModule,
         MatCheckboxModule,MatSnackBarModule,MatFormFieldModule, 
           } from '@angular/material'
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { IconComponent } from '../icon/icon.component';
import {MatDialogModule,MatDialogRef ,MAT_DIALOG_DATA} from '@angular/material/dialog';

import { CreateNoteDialogboxComponent } from './create-note-dialogbox.component';
import { RouterModule } from '@angular/router';

describe('CreateNoteDialogboxComponent', () => {
  let component: CreateNoteDialogboxComponent;
  let fixture: ComponentFixture<CreateNoteDialogboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNoteDialogboxComponent,IconComponent ],
      imports:[
        MatIconModule,
        MatCardModule,
        FormsModule,MatMenuModule,
        MatDividerModule,MatCheckboxModule,MatSnackBarModule,
        HttpClientModule,
        MatFormFieldModule,ReactiveFormsModule,
        RouterModule.forRoot([]),
        MatDialogModule
        
      ],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: {} },
                  { provide: MatDialogRef, useValue: {} }],
    }) 
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNoteDialogboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

 
});
