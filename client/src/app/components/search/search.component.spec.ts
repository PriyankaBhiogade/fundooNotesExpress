import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule, MatIconModule, MatFormFieldModule, MatChipsModule, MatMenuModule, MatDividerModule, MatCheckboxModule, 
  MatSnackBarModule, MatListModule, MatDialogModule, MatToolbarModule, MatSidenavModule } from '@angular/material';
import { IconComponent } from '../icon/icon.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchComponent } from './search.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CreateNotesComponent } from '../create-notes/create-notes.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchComponent ,DashboardComponent,IconComponent,CreateNotesComponent],
      imports :[
        MatCardModule,MatIconModule,
        FormsModule,MatFormFieldModule,
        MatChipsModule,MatMenuModule,
        MatDividerModule,MatCheckboxModule,
        RouterTestingModule,
        MatSnackBarModule,MatListModule,
        HttpClientModule,MatDialogModule,
        BrowserAnimationsModule,MatToolbarModule,MatSidenavModule
      ],
      providers:[DashboardComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
