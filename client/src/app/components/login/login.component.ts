import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { UserModel } from 'src/app/models/user';
import { UserService } from '../../services/user.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  getErrorMessage = '';
  user: UserModel = new UserModel();
  token: String
  email = new FormControl(this.user.email, [Validators.required, Validators.pattern('^[a-zA-Z0-9._]+@[a-zA-Z]+.[a-zA-Z]+$')])
  password = new FormControl(this.user.password, [Validators.required, Validators.minLength(6)])
  data: any;

  constructor(public formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private userService: UserService) { }


  ngOnInit() {
  }
  emailError() {
    return this.email.hasError('required') ? 'Email Id is require' :
      this.email.hasError('pattern') ? 'Email Id is Invalid, please recheck once' : '';
  }
  passwordError() {
    return this.password.hasError('required') ? 'Passowrd is require' :
      this.password.hasError('minlength') ? 'Minimum length must be 6' : '';
  }
  next(user) {
    user = {
      email: this.email.value,
      password: this.password.value
    }
    console.log("user", user);

    if (this.email.value == '' && this.password.value == '') {
      this.getErrorMessage = "Fields are required";
      return;
    }
    this.userService.login(user).subscribe(
      response => {
        console.log("datadata", response);

        const userId = response.data.response.userId;
        const firstName = response.data.response.firstName;
        const lastName = response.data.response.lastName;
        const email = response.data.response.email
        const token = response.token
        const profile = response.data.response.profilePic;

        localStorage.setItem('token', token)
        localStorage.setItem("userId", userId);
        localStorage.setItem("firstName", firstName);
        localStorage.setItem("lastName", lastName);
        localStorage.setItem("email", email);
        localStorage.setItem("profile", profile);

        this.snackBar.open(
          'Login Successful',
          'End now',
          { duration: 1000 });
        this.router.navigateByUrl('/dashboard');
      },
      error => {
        this.snackBar.open(
          "Login Failed",
          "undo",
          { duration: 2500 });
          this.router.navigateByUrl('/login');
      }
    )
  }

}
