import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { UserModel } from 'src/app/models/user';
import { UserService } from '../../services/user.service'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  getErrorMessage = '';
  user: UserModel = new UserModel();
  firstName = new FormControl(this.user.firstName, [Validators.required])
  lastName = new FormControl(this.user.lastName, [Validators.required])
  email = new FormControl(this.user.email, [Validators.required, Validators.pattern('^[a-zA-Z0-9._]+@[a-zA-Z]+.[a-zA-Z]+$')])
  password = new FormControl(this.user.password, [Validators.required, Validators.minLength(6)])
  confirmPassword = new FormControl(this.user.confirmPassword, [Validators.required, Validators.minLength(6)])
  data: any;

  constructor(public formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService) { }

  ngOnInit() {
  }
  firstNameError() {
    return this.firstName.hasError('required') ? 'First Name is require' : '';
  }
  lastNameError() {
    return this.lastName.hasError('required') ? 'Last Name is require' : '';
  }
  emailError() {
    return this.email.hasError('required') ? 'Email Id is require' :
      this.email.hasError('pattern') ? 'Email Id is Invalid, please recheck once' : '';
  }
  passwordError() {
    return this.password.hasError('required') ? 'Passowrd is require' :
      this.password.hasError('minlength') ? 'Minimum length must be 6' : '';
  }
  confirmPasswordError() {
    return this.confirmPassword.hasError('required') ? 'Confirm Passowrd is require' :
      this.confirmPassword.hasError('minlength') ? 'Minimum length must be 6' : '';
  }
  next() {
    this.user = {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      email: this.email.value,
      password: this.password.value,
      confirmPassword: this.confirmPassword.value
    }
    console.log("datata", this.user);

    if (this.firstName.value == '' && this.lastName.value == '' && this.confirmPassword.value == '' && this.email.value == '' && this.password.value == '') {
      this.getErrorMessage = "Fields are required";
      return;
    }
    if (this.password.value != this.confirmPassword.value) {
      this.getErrorMessage = "Password and Confirm Password not Matching";
      return;
    }
    this.userService.register(this.user).subscribe(
      response => {
        console.log("response", response)
        this.snackBar.open(
          'Registration Successful',
          'End now',
          { duration: 1000 });
        this.router.navigateByUrl('/login');
      },
      error => {
        this.snackBar.open(
          "Registration Failed",
          "undo",
          { duration: 2500 })
      }
    )
  }
}
