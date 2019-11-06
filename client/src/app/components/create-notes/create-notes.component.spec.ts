import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule,MatCardModule,MatMenuModule,MatDividerModule,MatCheckboxModule,MatSnackBarModule} from '@angular/material'
import { CreateNotesComponent } from './create-notes.component';
import { IconComponent } from '../icon/icon.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

describe('CreateNotesComponent', () => {
  let component: CreateNotesComponent;
  let fixture: ComponentFixture<CreateNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNotesComponent,IconComponent ],
      imports:[
        MatIconModule,
        MatCardModule,
        FormsModule,MatMenuModule,
        MatDividerModule,
        MatCheckboxModule,
        MatSnackBarModule,
        HttpClientModule


      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
