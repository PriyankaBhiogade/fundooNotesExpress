import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule, MatIconModule, MatFormFieldModule, MatChipsModule, MatMenuModule, MatDividerModule,
   MatCheckboxModule, MatSnackBarModule, MatListModule, MatDialogModule } from '@angular/material';

import { IsTrashComponent } from './is-trash.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconComponent } from '../icon/icon.component';

describe('IsTrashComponent', () => {
  let component: IsTrashComponent;
  let fixture: ComponentFixture<IsTrashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IsTrashComponent ,IconComponent],
      imports: [
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
    fixture = TestBed.createComponent(IsTrashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
