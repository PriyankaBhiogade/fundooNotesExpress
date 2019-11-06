import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconComponent } from './icon.component';
import { MatIconModule, MatCardModule,MatCheckboxModule, MatDividerModule, MatMenuModule, MatSnackBarModule, MatListModule, MatDialogModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('IconComponent', () => {
  let component: IconComponent;
  let fixture: ComponentFixture<IconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconComponent ],
      imports:[
        MatIconModule, MatCardModule,
        MatDividerModule,MatCheckboxModule,
        RouterModule,MatMenuModule,
        ReactiveFormsModule,FormsModule,
        RouterTestingModule,
        MatSnackBarModule,MatListModule,
        MatDialogModule, HttpClientModule,
        BrowserAnimationsModule

      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
