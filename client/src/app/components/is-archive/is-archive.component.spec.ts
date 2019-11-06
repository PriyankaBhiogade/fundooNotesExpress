import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule, MatIconModule, MatFormFieldModule, MatChipsModule, MatMenuModule, 
  MatDividerModule, MatCheckboxModule, MatSnackBarModule, MatListModule, MatDialogModule } from '@angular/material';

import { IsArchiveComponent } from './is-archive.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconComponent } from '../icon/icon.component';

describe('IsArchiveComponent', () => {
  let component: IsArchiveComponent;
  let fixture: ComponentFixture<IsArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IsArchiveComponent ,IconComponent ],
      imports:[
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
    fixture = TestBed.createComponent(IsArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
