import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  getErrorMessage = '';
  user: UserModel = new UserModel();
  token: String
  email = new FormControl(this.user.email, [Validators.required, Validators.pattern('^[a-zA-Z0-9._]+@[a-zA-Z]+.[a-zA-Z]+$')])
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
  next(user) {
    user = {
      email: this.email.value,
    }
    console.log("user",user);
    
    if (this.email.value == '') {
      this.getErrorMessage = "Fields are required";
      return;
    }
    this.userService.forgotPassword(user).subscribe(
      response => {
        console.log("datadata",response);
        this.snackBar.open(
          'Forgot Successful link send to registered email id',
          'End now',
          { duration: 1000 });
        this.router.navigateByUrl('/login');
      },
      error => {
        this.snackBar.open(
          "Failed not ForgotPassword",
          "undo",
          { duration: 2500 })
      }
    )
  }
}
