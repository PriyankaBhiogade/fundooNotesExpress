import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule, MatSnackBarModule,MatInputModule, MatIconModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports:[
        MatIconModule,
        MatCardModule,
        FormsModule,RouterModule,
        MatInputModule,
        ReactiveFormsModule,
        RouterTestingModule,
        MatSnackBarModule,
        HttpClientModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('For valid and invalid FirstName field ', () => {

    component.firstName.setValue('');
    component.firstName.setValue('priyanka');
    component.firstName.setValue('piiyu12');

    expect(component.firstName.invalid).toBeFalsy();
    expect(component.firstName.valid).toBeTruthy();
  })

  it('For valid and invalid LastName field ', () => {

    component.lastName.setValue('');
    component.lastName.setValue('bhiogade');
    component.lastName.setValue('bhiogade12@12');

    expect(component.lastName.invalid).toBeFalsy();
    expect(component.lastName.valid).toBeTruthy();
  })

  it('For valid and invalid Email field ', () => {

    component.email.setValue('');
    component.email.setValue('pbhiogade93@gmail.com');
    component.email.setValue('pb113@gmail.com');

    expect(component.email.invalid).toBeFalsy();
    expect(component.email.valid).toBeTruthy();
  })

  it('For valid and invalid Password field ', () => {

    component.password.setValue('');
    component.password.setValue('priyanka@123');
    component.password.setValue('1224..');

    expect(component.password.invalid).toBeFalsy();
    expect(component.password.valid).toBeTruthy();
  })

  it('For valid and invalid ConfirmPassword field ', () => {

    component.confirmPassword.setValue('');
    component.confirmPassword.setValue('priyanka@123');
    component.confirmPassword.setValue('1224..');

    expect(component.confirmPassword.invalid).toBeFalsy();
    expect(component.confirmPassword.valid).toBeTruthy();
  })
});
